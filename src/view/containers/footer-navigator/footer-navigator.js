import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Label, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
//constants
import { ICONS } from '../../../constants/icons';
import styles from './styles';
//redux
import { setTabState } from '../../../reducers/tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDashboard } from '../../../reducers/show-dashboard';
import I18n from '@locales/I18n';

class FooterNavigation extends React.Component {
  render() {
    return (
      <View style={styles.footer_container}>
        {this.props.activeTab === 2 && (
          <LinearGradient
            colors={[
              this.props.userColor.transparent,
              this.props.userColor.drag_panel_color
            ]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.grad}
          />
        )}
        <Button
          transparent
          style={[styles.footer_tab]}
          onPress={() => {
            this.props.setTabState(0);
          }}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              this.props.activeTab === 0
                ? styles.footer_tab_icon_active
                : styles.footer_tab_icon
            }
            source={
              this.props.activeTab === 0
                ? { uri: ICONS.FOOTER_TABS.GAME_ACTIVE }
                : { uri: ICONS.FOOTER_TABS.GAME }
            }
          />
          {this.props.activeTab === 0 ? (
            <Label style={styles.footer_tab_text}>
              {' '}
              {I18n.t('GAME.GAME_TITLE').toUpperCase()}{' '}
            </Label>
          ) : null}
        </Button>
        <Button
          transparent
          style={[styles.footer_tab]}
          onPress={() => {
            this.props.setTabState(1);
          }}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              this.props.activeTab === 1
                ? styles.footer_tab_icon_active
                : styles.footer_tab_icon
            }
            source={
              this.props.activeTab === 1
                ? { uri: ICONS.FOOTER_TABS.SHOP_ACTIVE }
                : { uri: ICONS.FOOTER_TABS.SHOP }
            }
          />
          {this.props.activeTab === 1 ? (
            <Label style={styles.footer_tab_text}>
              {' '}
              {I18n.t('SHOP').toUpperCase()}{' '}
            </Label>
          ) : null}
        </Button>
        <Button
          transparent
          style={[styles.footer_tab]}
          onPress={() => {
            this.props.setTabState(2);
          }}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              this.props.activeTab === 2
                ? styles.footer_tab_icon_active
                : styles.footer_tab_icon
            }
            source={
              this.props.activeTab === 2
                ? { uri: ICONS.FOOTER_TABS.HISTORY_ACTIVE }
                : { uri: ICONS.FOOTER_TABS.HISTORY }
            }
          />
          {this.props.activeTab === 2 ? (
            <Label style={styles.footer_tab_text}>
              {' '}
              {I18n.t('HISTORY').toUpperCase()}{' '}
            </Label>
          ) : null}
        </Button>
        <Button
          transparent
          style={[styles.footer_tab]}
          onPress={() => this.props.setTabState(3)}
        >
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={
              this.props.activeTab == 3
                ? styles.footer_tab_icon_active
                : styles.footer_tab_icon
            }
            source={
              this.props.activeTab === 3
                ? { uri: ICONS.FOOTER_TABS.PROFILE_ACTIVE }
                : { uri: ICONS.FOOTER_TABS.PROFILE }
            }
          />
          {this.props.activeTab === 3 ? (
            <Label style={styles.footer_tab_text}>
              {' '}
              {I18n.t('PROFILE').toUpperCase()}{' '}
            </Label>
          ) : null}
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeTab: state.activeTab,
    userColor: state.userColor,
    dashboard: state.dashboard,
    token: state.token
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTabState,
      showDashboard
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterNavigation);
