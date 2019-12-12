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

	const images = [storePoint.image[0], storePoint.image[0], storePoint.image[0]]

	return (
		<View style={styles.container}>
			<MapHeaderWhite title={`Баланс: ${storePoint.balance} ${profileState.currency}`} basket id={storePoint.id} />
			<ScrollView scrollEnabled={!visibleModal}>
				<MyCarousel data={images} pagination />
				<View style={{ alignItems: 'center', marginBottom: 44 }}>
					<Text style={styles.point_title}>{storePoint.title}</Text>
					<Text style={styles.point_bold}>{storePoint.work_time}</Text>
					<Text style={styles.point_addr}>{storePoint.address}</Text>

					{storePoint.phone.length < 1 && <Text style={styles.point_bold}>{`${I18n.t('STORE_PHONE')} - - -`}</Text>}
					{storePoint.phone.length === 1 && (
						<Text style={styles.point_bold} onPress={() => Linking.openURL(`tel:${storePoint.phone[0]}`)}>
							{`${I18n.t('STORE_PHONE')} ${storePoint.phone[0]}`}
						</Text>
					)}
					{storePoint.phone.length > 1 && (
						<>
							<Text style={styles.point_bold}>{`${I18n.t('STORE_PHONES')}`}</Text>
							{storePoint.phone.map((item) => (
								<Text style={styles.point_bold} onPress={() => Linking.openURL(`tel:${item}`)}>{`${item}`}</Text>
							))}
						</>
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
					<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.EARN')}</Text>
					<TouchableOpacity style={styles.buttonRed} onPress={() => dispatch(getMallPoint2(storePoint.sub_id))}>
						<Image style={styles.buttonRedImg} source={require('@assets/img/epocket_icon.png')} />
						<Text style={styles.buttonRedText}>{`${storePoint.about_missions.count} ${I18n.t('STORE_POINT.TASKS')}`}</Text>
						<View style={styles.buttonRedPrice}>
							<Text style={styles.buttonRedPriceText}>{`+ ${storePoint.about_missions.price} ${profileState.currency}`}</Text>
						</View>
					</TouchableOpacity>
					<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.NEWS')}</Text>
					<MyCarousel data={images} />
					<Text style={[styles.categoriesText, { marginTop: 35 }]}>{I18n.t('STORE_POINT.ABOUT')}</Text>
					<Text style={styles.aboutText}>{storePoint.about}</Text>
					{/* {storePoint.links.length > 0 && ( */}
						<>
							<Text style={styles.categoriesText}>{I18n.t('STORE_POINT.LINKS')}</Text>
							<View>
								{/* {storePoint.links.map((item) => ( */}
								{['epocketcash.com','epocketcash.com','epocketcash.com'].map((item) => (
									<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 16 }}>
										<Image source={require('@assets/img/web.png')} style={{ width: 20, height: 20, marginRight: 20 }} />
										<Text onPress={() => Linking.openURL(`https://www.${item}`)}>{item}</Text>
									</View>
								))}
							</View>
						</>
					{/* )} */}
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
