import React from 'react';
import { View, BackHandler } from 'react-native';
import FastImage from 'react-native-fast-image';
//containers
import Navbar from './../../containers/cashout-navbar/cashout-navbar';
//constants
import styles from './styles';
//services
import NavigationService from './../../../services/route';

class Picture extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationService.navigate('Main');
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render = () => {
    return (
      <View style={styles.container}>
        <Navbar
          copyOfCards={this.props.navigation.state.params.copyOfCards}
          general_info={this.props.navigation.state.params.general_info}
        />
        <View style={styles.block}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{ uri: this.props.navigation.state.params.image }}
            style={styles.image}
          />
        </View>
      </View>
    );
  };
}

export default Picture;
