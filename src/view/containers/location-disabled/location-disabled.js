import React from 'react'
import { View, Text, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
import Permissions from 'react-native-permissions'
import LinearGradient from 'react-native-linear-gradient'
//constants
import styles from './styles'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { current } from '@reducers/location'
//components
import Blur from '../blur/blur'
//services
import config from '@constants/config'
import BackgroundGeolocationModule from '../../../services/background-geolocation-picker'
import I18n from '@locales/I18n'

class LocationDisabled extends React.Component {
	async checkIsLocation() {
		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
			interval: 10000,
			fastInterval: 5000,
		})
			.then((data) => {
				this.props.current()
			})
			.catch((err) => {})
	}

	connectGeolocation = () => {
		try {
			if (Platform.OS === 'ios') {
				BackgroundGeolocationModule.ready(config(), (state) => {
					if (!state.enabled) {
						BackgroundGeolocationModule.start(function() {})
						this.props.current()
					}
				})
			} else {
				BackgroundGeolocationModule.configure(config())
				BackgroundGeolocationModule.checkStatus((status) => {
					if (!status.isRunning) {
						BackgroundGeolocationModule.start()
						this.props.current()
					}
				})
			}
		} catch (err) {}
	}
	_requestLocation = () => {
		try {
			switch (Platform.OS) {
				case 'android': {
					BackgroundGeolocationModule.configure(config())
					BackgroundGeolocationModule.checkStatus((status) => {
						if (!status.isRunning) {
							BackgroundGeolocationModule.start()
							this.props.current()
						}
					})
					this.checkIsLocation()
					break
				}
				case 'ios': {
					BackgroundGeolocationModule.ready(config(), (state) => {
						if (!state.enabled) {
							BackgroundGeolocationModule.start(function() {})
						} else {
							Permissions.openSettings()
							this.props.current()
						}
					})
					break
				}
			}
		} catch (err) {}
	}
	render() {
		return this.props.geolocationIsVirgin && this.props.geolocationIsVirgin !== 'false' ? (
			<View style={styles.main_view}>
				<Blur dark />
				<FastImage
					style={styles.bottom_image}
					resizeMode={FastImage.resizeMode.contain}
					source={require('../../../assets/img/GEOLOCATION_ENABLE.gif')}
				/>
				<View style={[styles.circle_container, styles.virgin_container]}>
					<Text style={styles.location_disable_text_white}>{I18n.t('LOCATION_VIRGIN').toUpperCase()}</Text>
				</View>
				<View style={[styles.enable_location, styles.btnContainer, styles.virgin_btn_container]}>
					<Button
						transparent
						style={styles.enable_location}
						onPress={() => {
							this.connectGeolocation()
						}}
					>
						<LinearGradient
							colors={[
								this.props.userColor.first_gradient_color,
								this.props.userColor.second_gradient_color,
							]}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 1.0 }}
							style={styles.enable_location}
						/>
						<Text style={styles.location_enable_text}>{I18n.t('LOCATION_ENABLE')}</Text>
					</Button>
				</View>
			</View>
		) : (
			<View style={styles.main_view}>
				<Blur strong />
				<View style={styles.circle_container}>
					<Text style={styles.location_disable_text}>{I18n.t('LOCATION_DISABLED')}</Text>
				</View>
				<View style={[styles.enable_location, styles.btnContainer]}>
					<Button
						transparent
						style={styles.enable_location}
						onPress={() => {
							this._requestLocation()
						}}
					>
						<LinearGradient
							colors={[
								this.props.userColor.first_gradient_color,
								this.props.userColor.second_gradient_color,
							]}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 1.0 }}
							style={styles.enable_location}
						/>
						<Text style={styles.location_enable_text}>{I18n.t('LOCATION_ENABLE')}</Text>
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	geolocationIsVirgin: state.geolocationIsVirgin,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			current,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationDisabled)
