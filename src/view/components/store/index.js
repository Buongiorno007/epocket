import React, { useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'
import Modal from 'react-native-modal'
import { addToBasket } from '@reducers/basket'

function StorePoint({ storePoint, profileState, dispatch }) {
	const [visibleModal, setVisibleModal] = useState(false)
	const [currentObject, setCurrentObject] = useState({})
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

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={{ uri: storePoint.image }}>
				<View style={styles.opacity}>
					<MapHeaderWhite title={`Баланс: ${storePoint.balance} ${profileState.currency}`} basket />
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.title}>{storePoint.title}</Text>
						<Text style={styles.subtitle}>{storePoint.address}</Text>
					</View>
				</View>
			</ImageBackground>
			<View style={styles.withModal}>
				<FlatList
					style={styles.scroll}
					data={storePoint.categories}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
				/>
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
						<Text style={styles.buttonText}>
							{currentObject.in_basket ? 'УДАЛИТЬ ИЗ КОРЗИНЫ' : 'ДОБАВИТЬ В КОРЗИНУ'}
						</Text>
					</TouchableOpacity>
				</Modal>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => ({
	storePoint: state.storePoint,
	profileState: state.profileState,
})

export default connect(mapStateToProps)(StorePoint)
