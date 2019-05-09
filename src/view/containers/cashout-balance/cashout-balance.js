import React from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import FastImage from 'react-native-fast-image';
//constants
import styles from './styles';
import { ICONS } from './../../../constants/icons';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loaderState } from '../../../reducers/loader';
//services
import NavigationService from './../../../services/route';
import { Button } from 'native-base';
import I18n from '@locales/I18n';
import { urls } from '../../../constants/urls';
import { httpGet } from '../../../services/http';

class CashoutBalance extends React.Component {
  state = {
    currency: '',
    maxValue: 0,
    phone: ''
  };
  navigateBack = () => {
    this.props.navigation
      ? NavigationService.navigate(this.props.navigation.direction)
      : console.log('Fail. No navigation prop');
  };
  navigateToPartners = () => {
    NavigationService.navigate('Partners');
  };
  componentDidMount = () => {
    this.props.loaderState(true);
    AsyncStorage.getItem('user_info').then(value => {
      let object = JSON.parse(value);
      this.setState({
        currency: object.currency,
        phone: `+${object.phone}`
      });
    });
    httpGet(urls.get_received_bonuses, this.props.token).then(
      result => {
        this.setState({ maxValue: Number(result.body.refill) });
        this.props.loaderState(false);
      },
      error => {
        console.log(error, 'CashoutBalance ERROR');
        this.props.loaderState(false);
      }
    );
  };
  goRefill() {
    this.props.loaderState(true);
    NavigationService.navigate('RefillMobile', {
      currency: this.state.currency,
      maxValue: this.state.maxValue,
      phone: this.state.phone
    });
  }
  render = () => {
    return (
      <View style={styles.container}>
        {this.props.navigation && (
          <View style={[styles.block]}>
            <Button
              rounded
              block
              transparent
              onPress={() => this.navigateBack()}
              style={styles.navigation_item}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.icon}
                source={{ uri: ICONS.COMMON.NAVIGATE_BACK }}
              />
              <Text style={[styles.text, styles.title]}>
                {this.props.navigation.title}
              </Text>
            </Button>
          </View>
        )}
        {this.props.showCurrency ? (
          <View style={[styles.block, styles.vertical_block]}>
            <View style={[styles.balance_title]}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.epc_icon]}
                source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
              />
              <Text style={[styles.text, styles.title]}>
                {this.props.navigation
                  ? I18n.t('CASH.YOUR_TITLE')
                  : I18n.t('CASH.TITLE')}{' '}
                {Number(this.props.balance.toFixed(2))}{' '}
                {I18n.t('EPC', { currency: this.state.currency })}
              </Text>
            </View>
            <View>
              <Button
                rounded
                block
                transparent
                onPress={() => this.goRefill()}
                style={styles.refill}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.barcode_icon}
                  source={{ uri: ICONS.MOBILE }}
                />
                <Text style={[styles.textBlack, styles.title]}>
                  {I18n.t('CASH.REFILL')}
                </Text>
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.block}>
            <View style={[styles.item, styles.balance_title]}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={styles.epc_icon}
                source={{ uri: ICONS.COMMON.CASH_EPC_WHITE }}
              />
            </View>
            <View style={[styles.item, styles.balance_value]}>
              <Text style={[styles.text, styles.title]}>
                {this.props.navigation
                  ? I18n.t('CASH.YOUR_TITLE')
                  : I18n.t('CASH.TITLE')}{' '}
                {Number(this.props.balance.toFixed(2))}{' '}
                {I18n.t('EPC', { currency: this.state.currency })}
              </Text>
            </View>
          </View>
        )}
        {this.props.showCurrency && (
          <View style={[styles.block, styles.vertical_block_center]}>
            <View style={[styles.balance_title]}>
              <View style={styles.epc_icon_filler} />
              <Text style={[styles.text, styles.title]}>
                {I18n.t('CASH.PARTNERS')}
              </Text>
            </View>
            <View style={[styles.small_border, { display: 'none' }]} />
            <View>
              <Button
                rounded
                block
                transparent
                onPress={() => this.navigateToPartners()}
                style={styles.barcode_btn}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.barcode_icon}
                  source={{ uri: ICONS.COMMON.PARTNERS }}
                />
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  };
}
const mapStateToProps = state => ({
  userColor: state.userColor,
  balance: state.balance,
  profileState: state.profileState,
  token: state.token
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashoutBalance);
