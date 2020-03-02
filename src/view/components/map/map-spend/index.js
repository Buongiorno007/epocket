import React, { useEffect } from 'react'
import { View, ScrollView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import route from '@services/route'
import Basket from '@containers/basket'
import MapSpendButton from '@containers/map/map-spend-button'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import { findNearest, getDistance } from 'geolib'
import styles from './styles'
import I18n from '@locales/I18n'
import TittleSmallText from '@containers/tittle-small-text'

function MapSpend({ lat, lng, mapPoints, wallet, profileState }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	useEffect(() => {
		if (mapPoints.cashouts.length) {
			moveToNearest()
		}
	}, [])

	const renderMarker = (data) => {
		return (
			<Marker key={data.id} coordinate={data.location}>
				<View style={styles.markerOuter}>
					<Image style={styles.markerImage} source={{uri: data.photo}} />
				</View>
			</Marker>
		)
	}

	const moveToNearest = () => {
		let nearestMall = findNearest(region, mapPoints.cashouts)
		let distance = getDistance(region, nearestMall)
		if (distance > 0 && this.map) {
			setTimeout(() => {
				this.map.getMapRef().animateToRegion(
					{
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.000032 * distance,
						longitudeDelta: 0.000032 * distance,
					},
					500,
				)
			}, 500)
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={[styles.topBar, {borderBottomWidth: 1, borderBottomColor: '#e6e6e6',}]}>
					<Text style={[styles.text, styles.text_top, {marginLeft: 0, fontFamily: 'Rubik-Bold', fontSize: 34}]}>{`${I18n.t("MAP.PURCHASE")}`}</Text>
					<Basket style={styles.basket} invert/>
				</View>
				{/*<Text style={[styles.text]}>{I18n.t('MAP.PLACES')}</Text>*/}
				<TittleSmallText text={I18n.t('MAP.AVAILABLE')} styleContainer={{marginTop: 16, marginBottom: 16, marginLeft: 16}} />
				<View style={styles.map_view}>
					<ClusteredMapView
						style={styles.map}
						data={mapPoints.cashouts}
						initialRegion={region}
						ref={(r) => {
							this.map = r
						}}
						provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
						renderMarker={renderMarker}
						animateClusters={false}
						showsCompass={false}
						edgePadding={{ top: 50, left: 50, bottom: 50, right: 50 }}
						noPrice
					>
						<Marker
							coordinate={{
								latitude: lat,
								longitude: lng,
							}}
						>
							<View style={styles.markerOutline}><Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{uri: 'data:image/png;base64,' + profileState.photo}} /></View>
						</Marker>
					</ClusteredMapView>
					<TouchableOpacity style={styles.touchMap} onPress={() => route.push('MapPlaces')}></TouchableOpacity>
				</View>
				<View style={styles.scroll}>
					{/* <Text style={styles.text}>{I18n.t('BARCODE_PAY')}</Text> */}
					<View style={styles.fieldStyle}>
						<MapSpendButton
							img={require('@assets/img/barcode.png')}
							text={I18n.t('BARCODE')}
							callback={() => route.push('Barcode')}
							space
						/>
						<TittleSmallText text={I18n.t('MAP.ONLINE')} styleText={{color: '#E60050'}}/>
						<MapSpendButton
							img={require('@assets/img/bask.png')}
							text={I18n.t('ONLINE_SHOP')}
							callback={() => route.push('Partnrs')}
							space
						/>
						{/* <MapSpendButton
							img={require('@assets/img/phone.png')}
							text={I18n.t('REFILL.PAYMENT_G')}
							callback={() => route.push('Refill')}
							space
						/> */}
					</View>
					{/* <Text style={styles.text}>{I18n.t('HOME')}</Text> */}
				</View>
			</ScrollView>
			<FooterNavigation />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
		lat: state.location.coordinate.lat,
		lng: state.location.coordinate.lng,
		profileState: state.profileState,
		wallet: state.wallet,
	}
}

export default connect(mapStateToProps)(MapSpend)
