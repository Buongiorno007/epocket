import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { WebView } from 'react-native-webview';

import qs from "qs";
import { Button } from "native-base";
import Icon from "react-native-vector-icons/EvilIcons";
const { width, height } = Dimensions.get("window");
const patchPostMessageJsCode = `(${String(function() {
  var originalPostMessage = window.postMessage;
  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.postMessage = patchedPostMessage;
})})();`;
export default class Instagram extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  show() {
    this.setState({ modalVisible: true });
  }

  hide() {
    this.setState({ modalVisible: false });
  }

  _onNavigationStateChange(webViewState) {
    const { url } = webViewState;
    if (url && url.startsWith(this.props.redirectUrl)) {
      const match = url.match(/(#|\?)(.*)/);
      const results = qs.parse(match[2]);
      this.hide();
      if (results.access_token) {
        // Keeping this to keep it backwards compatible, but also returning raw results to account for future changes.
        this.props.onLoginSuccess(results.access_token, results);
      } else {
        this.props.onLoginFailure(results);
      }
    }
  }

  _onMessage(reactMessage) {
    try {
      const json = JSON.parse(reactMessage.nativeEvent.data);
      if (json && json.error_type) {
        this.hide();
        this.props.onLoginFailure(json);
      }
    } catch (err) {}
  }

  // _onLoadEnd () {
  //   const scriptToPostBody = "window.postMessage(document.body.innerText, '*')"
  //     this.webView.injectJavaScript(scriptToPostBody)
  // }

  onBackdropPress() {
    const { onBackdropPress } = this.props;
    if (onBackdropPress) {
      this.setState({ modalVisible: false });
    }
  }

  render() {
    const { clientId, redirectUrl, scopes, hideCloseButton } = this.props;
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
        transparent
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[styles.keyboardStyle, this.props.styles.keyboardStyle]}
          enabled
        >
          <WebView
            {...this.props}
            style={[styles.webView, this.props.styles.webView]}
            source={{
              uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join(
                "+"
              )}`
            }}
            scalesPageToFit
            mixedContentMode={"compatibility"}
            startInLoadingState
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            onError={this._onNavigationStateChange.bind(this)}
            // onLoadEnd={this._onLoadEnd.bind(this)}
            ref={webView => {
              this.webView = webView;
            }}
            injectedJavaScript={patchPostMessageJsCode}
          />
          {!hideCloseButton ? (
            <Button
              transparent
              rounded
              block
              onPress={this.hide.bind(this)}
              style={[styles.btnStyle, this.props.styles.btnStyle]}
            >
              <Icon
                name="close"
                style={[styles.closeStyle, this.props.styles.closeStyle]}
              />
            </Button>
          ) : null}
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
const propTypes = {
  clientId: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string,
  styles: PropTypes.object,
  scopes: PropTypes.array,
  onLoginSuccess: PropTypes.func,
  modalVisible: PropTypes.bool,
  onLoginFailure: PropTypes.func,
  onBackdropPress: PropTypes.bool,
  hideCloseButton: PropTypes.bool
};

const defaultProps = {
  redirectUrl: "https://epocket.dev.splinestudio.com",
  styles: {},
  scopes: ["public_content"],
  onLoginSuccess: token => {
    Alert.alert("Alert Title", "Token: " + token, [{ text: "OK" }], {
      cancelable: false
    });
  },
  onLoginFailure: failureJson => {
    console.debug(failureJson);
  }
};

Instagram.propTypes = propTypes;
Instagram.defaultProps = defaultProps;

const styles = StyleSheet.create({
  modalWarp: {
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  keyboardStyle: {
    position: "relative",
    height: height,
    width: width,
    paddingTop: 50,
    backgroundColor: "rgba(255,255,255,1)"
  },

  webView: {
    flex: 1
  },
  btnStyle: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 15,
    right: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  closeStyle: {
    color: "#000",
    fontSize: 30
  }
});
