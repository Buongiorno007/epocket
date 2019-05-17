import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  Animated,
  Keyboard
} from 'react-native';

const base64Icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

const data = [
  {
    icon: base64Icon,
    country: 'Ukraine',
    code: '+380',
    activity: false,
    id: '1'
  }
];

export default class SignForm extends Component {
  state = { imgUri: '', codeValue: '+380', visible: false, top: 0, width: 0 };

  blur = () => {
    this.setState({ visible: false });
  };

  renderElement(img, code, country) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.setState({ imgUri: img, codeValue: code, visible: false })
        }
      >
        <Image style={styles.imgStyle} source={{ uri: img }} />
        <Text>{country}</Text>
        <Text>{code}</Text>
      </TouchableOpacity>
    );
  }

  opnDropDown() {
    // Keyboard.dismiss();
    console.log(Keyboard, 'KEYBOARD');
    // this.phoneNumber.blur();
    // console.log(this.phoneNumber.isFocused(), 'IS FOCUSED');
    setTimeout(() => {
      this.setState({ visible: true });
    }, 150);
  }

  render() {
    return (
      <View
        style={styles.cont}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          this.setState({ top: layout.y, width: layout.width });
        }}
      >
        <View style={styles.viewInput}>
          <TouchableOpacity
            style={styles.choseCountry}
            onPress={() => this.opnDropDown()}
          >
            <Image style={styles.imgStyle} source={{ uri: base64Icon }} />
            <Text style={styles.resultText}>{this.state.codeValue}</Text>
          </TouchableOpacity>
          <TextInput
            ref={ref => (this.phoneNumber = ref)}
            style={styles.textInput}
            value={'-- --- -- --'}
          />
        </View>
        <Modal visible={this.state.visible} transparent={true}>
          <View
            style={[styles.overlay]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={this.blur}
          >
            <ScrollView
              style={{
                top: this.state.top + 49,
                width: this.state.width,
                marginHorizontal: 25
              }}
            >
              {this.renderElement(base64Icon, '+380', 'Ukraine')}
              {this.renderElement(base64Icon, '+7', 'Russian')}
              {this.renderElement(base64Icon, '+48', 'IDK')}
              {this.renderElement(base64Icon, '+1', 'USA')}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    marginVertical: 10,
    position: 'relative',
    width: '100%',
    zIndex: 900
  },
  choseCountry: {
    width: '25%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginRight: 15
  },
  textInput: {
    width: '100%',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    color: '#FFF'
  },
  imgStyle: {
    width: 26,
    height: 18,
    resizeMode: 'contain'
  },
  resultText: {
    color: '#fff'
  },
  viewInput: {
    display: 'flex',
    flexDirection: 'row'
  },
  scrollView: {
    width: '100%',
    height: 192,
    zIndex: 100
  },
  item: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    zIndex: 996
  },
  baasdasad: {
    backgroundColor: 'blue',
    width: '100%',
    height: 200
  },
  touchOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    zIndex: 999
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  }
});
