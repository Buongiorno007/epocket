import React from 'react'
import { View, Platform, Text, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import MapView, { Marker, Circle } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
//constants
import styles from './styles'
import { colors } from './../../../constants/colors'
import { ICONS } from '../../../constants/icons'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import I18n from '@locales/I18n'

class TRCMarker extends React.Component {
	constructor(props) {
		super(props)
	}
	ios = Platform.OS === 'ios' ? true : false
	state = {
		coordinate: {
			latitude: parseFloat(this.props.marker.lat),
			longitude: parseFloat(this.props.marker.lng),
		},
		marker: {},
		currency: '',
	}
	componentDidMount() {
		AsyncStorage.getItem('user_info').then((value) => {
			let object = JSON.parse(value)
			this.setState({ currency: object.currency })
		})
	}

	render() {
		return (!this.props.cashoutMarker && !this.props.discountMarker && this.props.marker.formated.money > 0) || //condition for outlets
		this.props.cashoutMarker || //condition for cashouts
			(this.props.discountMarker && this.props.marker.discount > 0) ? ( //condition for discounts
			<View style={styles.main_view}>
				<Marker
					style={[
						styles.marker,
						this.props.discountMarker && {
							width: 60,
							height: 60,
						},
						!this.ios &&
							(this.props.discountMarker || this.props.cashoutMarker) && {
								width: 60,
								height: 60,
							},
					]}
					ref={(marker) => {
						this.marker = marker
					}}
					onPress={this.props.onPress}
					coordinate={{
						latitude: parseFloat(this.props.marker.location.latitude),
						longitude: parseFloat(this.props.marker.location.longitude),
					}}
					pinColor={this.props.userColor.blue}
				>
					{this.props.active && (
						<LinearGradient
							colors={
								this.props.discountMarker
									? [
											this.props.userColor.active_marker_violet,
											this.props.userColor.active_marker_lightviolet,
									  ]
									: this.props.cashoutMarker
									? [
											this.props.userColor.active_marker_blue,
											this.props.userColor.active_marker_lightblue,
									  ]
									: [
											this.props.userColor.active_marker_red,
											this.props.userColor.active_marker_lightred,
									  ]
							}
							start={{ x: 0.0, y: 1.0 }}
							end={{ x: 1.0, y: 0.0 }}
							style={[
								this.props.discountMarker ? styles.big_gradient : styles.gradient,
								!this.ios &&
									this.props.cashoutMarker && {
										top: 0,
										left: 0,
									},
							]}
						/>
					)}
					<ImageBackground
						key={this.props.marker.id}
						style={[
							this.props.discountMarker ? styles.discount_image : styles.image,
							this.props.active &&
								this.ios && {
									marginTop: this.props.discountMarker ? 0 : 10,
								},
							this.ios && this.props.cashoutMarker && { left: 20 },
							!this.ios && this.props.cashoutMarker && { left: -2.5, top: -2.5 },
						]}
						source={{
							uri: this.props.discountMarker
								? this.props.active
									? ICONS.COMMON.DISCOUNT_ACTIVE
									: ICONS.COMMON.DISCOUNT_INACTIVE
								: this.props.cashoutMarker
								? this.props.active
									? ICONS.COMMON.CASHOUT_ACTIVE
									: ICONS.COMMON.CASHOUT_INACTIVE
								: this.props.active
								? ICONS.COMMON.STORE_ACTIVE
								: ICONS.COMMON.STORE_INACTIVE,
						}}
					>
						{this.props.discountMarker && (
							<View style={styles.discount_text_container}>
								<Text
									style={[
										styles.discount_text,
										this.props.active && { color: this.props.userColor.white },
									]}
								>
									%
								</Text>
								<Text
									style={[
										styles.discount_text,
										this.props.active && { color: this.props.userColor.white },
									]}
								>
									-{this.props.marker.discount}
								</Text>
							</View>
						)}
					</ImageBackground>
					{!this.props.discountMarker && !this.props.cashoutMarker && (
						<View style={[!this.props.active ? styles.mall_price_view : styles.mall_price_view_fill]}>
							<Text style={styles.mall_price}>
								{!this.props.active
									? Number(Number(this.props.marker.formated.money).toFixed(2))
									: '      '}
							</Text>
							<Text style={styles.mall_price_epc}>
								{!this.props.active ? I18n.t('EPC', { currency: this.state.currency }) : '      '}
							</Text>
						</View>
					)}
				</Marker>
				<Circle
					center={{
						latitude: Number(this.props.marker.lat),
						longitude: Number(this.props.marker.lng),
					}}
					radius={this.props.marker.rad}
					strokeWidth={0}
					fillColor={
						this.props.marker.id === this.props.selected
							? this.props.userColor.trc_marker_light_green
							: this.props.userColor.trc_marker_blue
					}
				/>
			</View>
		) : null
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TRCMarker)
