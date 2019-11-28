import React, { useEffect, useState } from 'react'
import { View, Image, Platform, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import ClusteredMapView from '../../../../../native_modules/react-native-maps-super-cluster'
import { connect } from 'react-redux'
import MapEarnMarker from '@containers/map/map-earn-marker'
import MissionBanner from '@containers/map/mission-banner'
import { findNearest, getDistance } from 'geolib'
import styles from './styles'
import MapEarnButton from '@containers/map/map-earn-button'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import { getInstaList } from "@reducers/progressTask"
import sbHeight from "@services/getSBHeight"
import I18n from '@locales/I18n'
import route from '@services/route'

function NewMapEarn({ profileState, mapPoints, lat, lng, dispatch }) {
	const [trigger, setTrigger] = useState(false)
	const region = {
		latitude: lat,
		longitude: lng,
		latitudeDelta: 0.006,
		longitudeDelta: 0.006,
	}

	useEffect(() => {
		if (mapPoints.outlets.length) {
			moveToNearest()
		}
	}, [trigger])

	const renderMarker = (data) => {
		return <MapEarnMarker key={data.id} data={data} />
	}

	const moveToNearest = () => {
		let nearestMall = findNearest(region, mapPoints.outlets)
		let distance = getDistance(region, nearestMall) - nearestMall.rad
		if (distance > 0 && this.map) {
			setTimeout(() => {
				this.map.getMapRef().animateToRegion(
					{
						latitude: lat,
						longitude: lng,
						latitudeDelta: 0.000028 * distance,
						longitudeDelta: 0.000028 * distance,
					},
					500,
				)
			}, 500)
		}
	}

	return (
        <View style={[styles.container, trigger ? null : {paddingBottom: 61}]}>
            <ScrollView style={[styles.scrollView, trigger ? {marginTop: 0} : null]}>
				<Text style={[styles.tittle, {marginLeft: 16, marginBottom: 16}, trigger && styles.displayNone]}>{I18n.t('EARN.ON_MAP')}</Text>
                <View style={trigger ? styles.map_view_big : styles.map_view}>
					{trigger && <TouchableOpacity style={styles.goBack} onPress={() => setTrigger(!trigger)}>
						<Image style={styles.goBackImg} source={require('@assets/img/chevron.png')} resizeMode={'contain'}/>
					</TouchableOpacity>}
					<MissionBanner top={trigger ? sbHeight : 0}/>
                    <ClusteredMapView
                        style={{ flex: 1 }}
                        data={mapPoints.outlets}
                        initialRegion={region}
                        provider={Platform.OS === 'ios' ? PROVIDER_GOOGLE : null}
                        ref={(r) => {
                            this.map = r
                        }}
                        renderMarker={renderMarker}
                        animateClusters={false}
                        showsCompass={false}
                        edgePadding={{ top: 50, left: 50, bottom: 50, right: 50 }}
                        currency={profileState.currency}
                    >
                        <Marker
                            coordinate={{
                                latitude: lat,
                                longitude: lng,
                            }}
                        >
                            <Image style={{ width: 40, height: 40 }} source={require('@assets/img/smile.png')} />
                        </Marker>
                    </ClusteredMapView>
					{!trigger && <TouchableOpacity style={[styles.touchMap]} onPress={() => setTrigger(!trigger)}></TouchableOpacity>}
                </View>
                <View style={[styles.scroll, trigger && styles.displayNone]}>
                    <Text style={styles.tittle}>{I18n.t('EARN.GAMES')}</Text>
                    <MapEarnButton 
						img={require('@assets/img/brand_games_ico.png')}
						text={I18n.t('EARN.BRAND_GAMES')}
						callback={() => route.push('Gamepage')}
						pub={'games'}
						space
					/>
                    <Text style={styles.tittle}>{I18n.t('EARN.POSTS')}</Text>
                    <MapEarnButton 
						img={require('@assets/img/post_insta_ico.png')}
						text={I18n.t('EARN.POST_INSTA')}
						callback={() => {
							// dispatch(getInstaList())
							route.push('InstaPost')
						}}
						space
						pub={'publications'}
						arrow
					/>

					<Text style={styles.tittle}>{I18n.t('EARN.REFERAL')}</Text>
					<MapEarnButton 
						img={require('@assets/img/invite-friend-ico.png')}
						text={I18n.t('REF_LINK.ADD_FRIEND2')}
						callback={() => {
							route.push('AddFriend')
						}}
						space
						pub={'advert_friend'}
						arrow
					/>
					<MapEarnButton 
						img={require('@assets/img/invite-advert-ico.png')}
						text={I18n.t('REF_LINK.ADD_ADVERT2')}
						callback={() => {
							route.push('AddAdvert')
						}}
						space
						pub={'advert_advert'}
						arrow
					/>
                </View> 
            </ScrollView>
			{!trigger && <FooterNavigation />}
        </View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
		lat: state.location.coordinate.lat,
		lng: state.location.coordinate.lng,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(NewMapEarn)
