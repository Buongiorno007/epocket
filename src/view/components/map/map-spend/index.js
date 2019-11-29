import React, { useEffect } from 'react'
import { View, ScrollView, Platform, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClusteredMapView from '../../../../native_modules/react-native-maps-super-cluster'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import LinearGradient from 'react-native-linear-gradient'
import route from '@services/route'
import Basket from '@containers/basket' 
import MapSpendButton from '@containers/map/map-spend-button'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import styles from './styles'
import I18n from '@locales/I18n'

function MapSpend({ lat, lng, mapPoints, wallet, profileState }) {
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	const renderMarker = (data) => {
		return (
			<Marker key={data.id} coordinate={data.location}>
				<Image style={{ width: 10, height: 10 }} source={require('@assets/img/spend.png')} />
			</Marker>
		)
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.topBar}>
					<Text style={[styles.text, styles.text_top]}>{`${I18n.t("CASH.TITLE")} ${wallet.balance} ${profileState.currency}`}</Text>
					<Basket style={styles.basket} invert/> 
				</View>
				<Text style={[styles.text]}>{I18n.t('MAP.PLACES')}</Text>
				<View style={styles.map_view}>				
					<ClusteredMapView
						style={styles.map}
						data={mapPoints.cashouts}
						initialRegion={region}
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
							<Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{uri: 'data:image/png;base64,' + profileState.photo}} />
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
						<MapSpendButton
							img={require('@assets/img/bask.png')}
							text={I18n.t('ONLINE_SHOP')}
							callback={() => route.push('Partnrs')}
							space
						/>
						<MapSpendButton
							img={require('@assets/img/phone.png')}
							text={I18n.t('REFILL.PAYMENT_G')}
							callback={() => route.push('Refill')}
							space
						/>
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
