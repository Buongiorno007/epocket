import React, { useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'
import Modal from 'react-native-modal'
import { addToBasket } from '@reducers/basket'
import I18n from '@locales/I18n'

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

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
		<ScrollView
			style={{ flex: 1 }}
			horizontal //scrolling left to right instead of top to bottom
			showsHorizontalScrollIndicator={false} //hides native scrollbar
			scrollEventThrottle={10} //how often we update the position of the indicator bar
			pagingEnabled //scrolls from one image to the next, instead of allowing any value inbetween
			onLayout={(event) => {
				this.frameWidth = event.nativeEvent.layout.width
			}}
			onScroll={(event) => {
				this.xOffset = event.nativeEvent.contentOffset.x
				const index = Math.round(this.xOffset / this.frameWidth)
				setIndex(index)
			}}
		>
			{images.map((item, index) => (
				<Image style={styles.image} source={{ uri: item }} resizeMode={'cover'} key={index} />
			))}
		</ScrollView>
				{images.length > 1 && (
					<View style={styles.dotsContainer}>
						{images.map((it, ind) => (
							<View
								style={[
									styles.dots,
									{ backgroundColor: ind === index ? 'white' : 'rgba(255,255,255, 0.30)' },
								]}
							></View>
						))}
					</View>
				)}
			</View>
			<ImageBackground style={styles.image} source={{ uri: storePoint.image }}>
				<View style={styles.opacity}>
					<MapHeaderWhite
						title={`Баланс: ${storePoint.balance} ${profileState.currency}`}
						basket
						id={storePoint.id}
					/>
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
					scrollEnabled={!visibleModal}
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
							{currentObject.in_basket ? I18n.t('BASKET_REMOVE') : I18n.t('BASKET_ADD')}
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
