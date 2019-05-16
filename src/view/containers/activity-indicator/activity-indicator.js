import React from 'react';
import { View, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
//constants
import styles from './styles';
//container
// import Blur from '../blur/blur';
import { BlurView } from '@react-native-community/blur';
// import BlurOverlay, {
//   closeOverlay,
//   openOverlay
// } from 'react-native-blur-overlay';

const gif_url = '../../../assets/img/preloader_nobg.gif';

class ActivityIndicator extends React.Component {
  // componentDidMount() {
  //   openOverlay();
  // }
  // renderBlurChilds() {
  //   return (
  //     <FastImage
  //       resizeMode={FastImage.resizeMode.contain}
  //       source={require(gif_url)}
  //       style={styles.loader_image}
  //     />
  //   );
  // }
  renderBlur() {
    return Platform.OS == 'ios' ? (
      <View style={styles.container}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={8} />
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require(gif_url)}
          style={styles.loader_image}
        />
      </View>
    ) : (
      <View style={styles.container_android}>
        {/* <BlurOverlay
          radius={25}
          downsampling={10}
          brightness={0}
          customStyles={{ alignItems: 'center', justifyContent: 'center' }}
          children={this.renderBlurChilds()}
        /> */}
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={require(gif_url)}
          style={styles.loader_image}
        />
      </View>
    );
  }
  render() {
    return this.renderBlur();
  }
}

export default ActivityIndicator;
