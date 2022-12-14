import React, { useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity, ScrollView, Linking } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'
import Modal from 'react-native-modal'
import { addToBasket } from '@reducers/basket'
import { getMallPoint2 } from '@reducers/mallPoint'
import I18n from '@locales/I18n'

import MyCarousel from '@containers/carousel'

function StorePoint({ storePoint, profileState, dispatch }) {
	const [visibleModal, setVisibleModal] = useState(false)

	const [currentObject, setCurrentObject] = useState({})
	console.log(currentObject, 'currentObject')

	const renderItem = ({ item }) => <Accordion item={item} pressProduct={pressProduct} />

	const keyExtractor = (item) => `${item.cat_id}`

	const pressProduct = (element) => {
		setCurrentObject({ ...element })
		setVisibleModal(true)
	}

	const updateBasket = () => {
		currentObject.in_basket
			? dispatch(addToBasket(currentObject.product_unique_id, false))
			: dispatch(addToBasket(currentObject.product_unique_id, true))

		setVisibleModal(false)
	}
	workTime = () => {
		let timeSplitted = storePoint.work_time.split(',')
		return timeSplitted
	}

	return (
		<View style={styles.container}>
			<MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${storePoint.balance} ${profileState.currency}`} basket id={storePoint.id} />
			<ScrollView scrollEnabled={!visibleModal}>
				<MyCarousel data={storePoint.image} pagination />
				<View style={{ alignItems: 'flex-start', marginHorizontal: 16, marginBottom: 32 }}>
					<Text style={styles.point_title}>{storePoint.title}</Text>

					<View style={{ flexDirection: 'row', marginTop: 16 }}>
						<Image source={require('@assets/img/location-pin.png')} style={{ width: 21, height: 21, marginRight: 8 }} />
						<Text style={styles.point_addr}>{storePoint.address}</Text>
					</View>

					<View style={{ flexDirection: 'row', marginTop: 16 }}>
						<Image source={require('@assets/img/ion_time.png')} style={{ width: 21, height: 21, marginRight: 8 }} />
						{workTime().map((workTime, ind) => (
							<Text style={styles.point_regular} key={ind}>
								{workTime}
							</Text>
						))}
					</View>

					{storePoint.phone.length && (
						<View style={{ flexDirection: 'row', marginTop: 16 }}>
							<Image source={require('@assets/img/el_phone.png')} style={{ width: 21, height: 21, marginRight: 8 }} />
							{storePoint.phone.map((item, ind) => (
								<Text style={styles.point_regular} onPress={() => Linking.openURL(`tel:${item}`)} key={ind}>
									{item}
								</Text>
							))}
						</View>
					)}
				</View>
				<View style={styles.withModal}>
					<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.GOODS')}</Text>
					<FlatList
						style={styles.scroll}
						data={storePoint.categories}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						scrollEnabled={!visibleModal}
					/>
					{storePoint.about_missions.count > 0 && (
						<>
							<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.EARN')}</Text>
							<TouchableOpacity style={styles.buttonRed} onPress={() => dispatch(getMallPoint2(storePoint.sub_id))}>
								<Image style={styles.buttonRedImg} source={require('@assets/img/epocket_icon.png')} />
								<Text style={styles.buttonRedText}>{`${I18n.t('STORE_POINT.TASKS')}`}</Text>
								<View style={styles.buttonRedPrice}>
									<Text style={styles.buttonRedPriceText}>{`+ ${storePoint.about_missions.price} ${profileState.currency}`}</Text>
								</View>
							</TouchableOpacity>
						</>
					)}
					{storePoint.news.length > 0 && (
						<>
							<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.NEWS')}</Text>
							<MyCarousel data={storePoint.news} news />
						</>
					)}
					{storePoint.about.length > 0 && (
						<>
							<Text style={[styles.categoriesText, { marginTop: 35 }]}>{I18n.t('STORE_POINT.ABOUT')}</Text>
							<Text style={styles.aboutText}>{storePoint.about}</Text>
						</>
					)}
					{storePoint.links.length > 0 && (
						<>
							<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.LINKS')}</Text>
							<View>
								{storePoint.links.map((item, ind) => (
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 16 }} key={ind}>
										<Image source={require('@assets/img/web.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
										<Text onPress={() => Linking.openURL(`https://www.${item}`)}>{item}</Text>
									</View>
								))}
							</View>
						</>
					)}
				</View>
			</ScrollView>
			<Modal
				style={styles.rnModal}
				swipeDirection='down'
				// useNativeDriver={true}
				coverScreen={false}
				isVisible={visibleModal}
				hasBackdrop={false}
				propagateSwipe={true}
				onSwipeComplete={() => setVisibleModal(false)}
			>
				<Image style={styles.img} source={{ uri: currentObject.photo }} />
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text style={styles.titleText}>{currentObject.name}</Text>
					<Text style={styles.priceText}>{`${currentObject.price} ${profileState.currency}`}</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={updateBasket}>
					<Text style={styles.buttonText}>{currentObject.in_basket ? I18n.t('BASKET_REMOVE') : I18n.t('BASKET_ADD')}</Text>
				</TouchableOpacity>
			</Modal>
		</View>
	)
}

const mapStateToProps = (state) => ({
	storePoint: state.storePoint,
	profileState: state.profileState,
})

export default connect(mapStateToProps)(StorePoint)
