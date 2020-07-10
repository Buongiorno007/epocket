import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert, Modal, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { WebView } from 'react-native-webview'

import qs from 'qs'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons'
const { width, height } = Dimensions.get('window')

const patchPostMessageJsCodeAndroid = `(${String(function() {
	setTimeout(function() {
		window.postMessage(document.getElementsByTagName('pre')[0].innerHTML), '*'
	}, 500)
})})();`
const patchPostMessageJsCodeIOS = `(${String(function() {
	{
		window.postMessage(document.getElementsByTagName('pre')[0].innerHTML)
	}
})})();`
export default class Instagram extends Component {
	constructor(props) {
		super(props)
		this.state = { modalVisible: false, url: '' }
	}

	show(url) {
		this.setState({ modalVisible: true, url })
	}

	hide() {
		this.setState({ modalVisible: false })
	}

	_onNavigationStateChange(webViewState) {
		const { url } = webViewState
		if (url && url.startsWith(this.props.redirectUrl)) {
			const match = url.match(/(#|\?)(.*)/)
			const results = qs.parse(match[2])
		}
	}

	_onMessage(reactMessage) {
		const json = JSON.parse(reactMessage.nativeEvent.data)
		if (json.token) {
			this.hide()
			this.props.onLoginSuccess(json)
		} else {
			this.hide()
			this.props.onLoginFailure(json)
		}
	}

	// _onLoadEnd () {
	//   const scriptToPostBody = "window.postMessage(document.body.innerText, '*')"
	//     this.webView.injectJavaScript(scriptToPostBody)
	// }

	onBackdropPress() {
		const { onBackdropPress } = this.props
		if (onBackdropPress) {
			this.setState({ modalVisible: false })
		}
	}

	render() {
		const { redirectUrl, scopes, hideCloseButton } = this.props
		return (
			<Modal
				animationType={'slide'}
				visible={this.state.modalVisible}
				onRequestClose={this.hide.bind(this)}
				transparent
			>
				<KeyboardAvoidingView
					behavior='padding'
					style={[styles.keyboardStyle, this.props.styles.keyboardStyle]}
					enabled
				>
					<WebView
						{...this.props}
						style={[styles.webView, this.props.styles.webView]}
						source={{ uri: this.state.url }}
						scalesPageToFit
						startInLoadingState
						onNavigationStateChange={this._onNavigationStateChange.bind(this)}
						onError={this._onNavigationStateChange.bind(this)}
						// onLoadEnd={this._onLoadEnd.bind(this)}
						onMessage={this._onMessage.bind(this)}
						ref={(webView) => {
							this.webView = webView
						}}
						injectedJavaScript={
							Platform.OS === 'ios' ? patchPostMessageJsCodeIOS : patchPostMessageJsCodeAndroid
						}
					/>
					{!hideCloseButton ? (
						<Button
							transparent
							rounded
							block
							onPress={this.hide.bind(this)}
							style={[styles.btnStyle, this.props.styles.btnStyle]}
						>
							<Icon name='close' style={[styles.closeStyle, this.props.styles.closeStyle]} />
						</Button>
					) : null}
				</KeyboardAvoidingView>
			</Modal>
		)
	}
}
const propTypes = {
	redirectUrl: PropTypes.string,
	styles: PropTypes.object,
	scopes: PropTypes.array,
	onLoginSuccess: PropTypes.func,
	modalVisible: PropTypes.bool,
	onLoginFailure: PropTypes.func,
	onBackdropPress: PropTypes.bool,
	hideCloseButton: PropTypes.bool,
}

const defaultProps = {
	redirectUrl: 'https://epocket.dev.splinestudio.com',
	styles: {},
	// scopes: ['user_profile'],
	scopes: [''],
	onLoginSuccess: (token) => {
		Alert.alert('Alert Title', 'Token: ' + token, [{ text: 'OK' }], {
			cancelable: false,
		})
	},
	onLoginFailure: (failureJson) => {
		console.debug(failureJson)
	},
}

Instagram.propTypes = propTypes
Instagram.defaultProps = defaultProps

const styles = StyleSheet.create({
	modalWarp: {
		height: height,
		width: width,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	keyboardStyle: {
		position: 'relative',
		height: height,
		width: width,
		paddingTop: 50,
		backgroundColor: 'rgba(255,255,255,1)',
	},

	webView: {
		flex: 1,
	},
	btnStyle: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 15,
		right: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeStyle: {
		color: '#000',
		fontSize: 30,
	},
})
