import React, { useEffect, useState } from 'react'
import { View, Image, Platform, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native'
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
import { triggerSet } from "@reducers/map-earn-trigger"
import { triggerInfoSet } from "@reducers/map-earn-trigger-infobox"
import route from "@services/route"
import sbHeight from "@services/getSBHeight"
import I18n from '@locales/I18n'

function NewMapEarn({ profileState, mapPoints, lat, lng, games, mallTask, trigger, triggerInfo, mallPoint, dispatch }) {
	// const [trigger, setTrigger] = useState(false)
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
	}, [trigger, triggerInfo])

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

	const closeMap = () => {
		dispatch(triggerInfoSet(false))
		dispatch(triggerSet(!trigger))
	}

	let games_aval = Number(games.available_game_len)
	console.log('games.available_game_len',games.available_game_len)
	console.log('games_aval',games_aval)
	let posts_aval = Number(mallTask.tasks.length)

	return (
        // <View style={[trigger ? {height: screenHeight} : [{height: windowHeight, paddingBottom: 61}], windowHeight !== screenHeight ? styles.marginTop: null]}>
        <View style={styles.container}>
            <ScrollView style={[styles.marginTop, trigger ? {marginTop: 0} : null]}>
				<Text style={[styles.tittle, {marginLeft: 16, marginBottom: 16}, trigger && styles.displayNone]}>{I18n.t('EARN.ON_MAP')}</Text>
                <View style={trigger ? styles.map_view_big : styles.map_view} onStartShouldSetResponder={() => dispatch(triggerInfoSet(false))}>
					{trigger && <TouchableOpacity style={styles.goBack} onPress={() => closeMap()}>
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
							style={{zIndex: 10}}
                        >
                            <View style={styles.markerOutline}><Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{uri: 'data:image/png;base64,' + profileState.photo}} /></View>
                        </Marker>
                    </ClusteredMapView>
					{!trigger && <TouchableOpacity style={[styles.touchMap]} onPress={() => dispatch(triggerSet(!trigger))}></TouchableOpacity>}
					
					{triggerInfo && <TouchableOpacity style={styles.infobox} onPress={() => route.navigate("MallPoint")}>
							<View style={{flexDirection: 'row'}}>
								<View style={styles.infobox_image_outline}><Image style={styles.infobox_image} source={{uri: mallPoint.image}}/></View>
								<Text style={styles.infobox_title}>{`${mallPoint.title}`}</Text>
							</View>
							<Text>{`${mallPoint.address}`}</Text>
					</TouchableOpacity>}
                </View>
                <View style={[styles.scroll, trigger && styles.displayNone]}>
					{games_aval > 0 && (
						<>
							<Text style={styles.tittle}>{I18n.t('EARN.GAMES')}</Text>
							<MapEarnButton 
								img={require('@assets/img/brand_games_ico.png')}
								text={I18n.t('EARN.BRAND_GAMES')}
								callback={() => route.push('Gamepage')}
								pub={'games'}
								space
							/>
						</>
					)}
					{posts_aval > 0 && (
						<>
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
						</>
					)}
                    
                    

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
		games: state.gameStart,
		mallTask: state.mallTask,
		trigger: state.trigger,
		triggerInfo: state.triggerInfo,
		mallPoint: state.mallPoint
	}
}

export default connect(mapStateToProps)(NewMapEarn)
