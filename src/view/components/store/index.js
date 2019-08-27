import React, { useState } from 'react'
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'
import Modal from 'react-native-modal'

function StorePoint({ storePoint, profileState }) {
	const [visibleModal, setVisibleModal] = useState(false)
	const [currentObject, setCurrentObject] = useState({ id: 0, image: '', title: '', price: '' })
	const renderItem = ({ item }) => <Accordion item={item} pressProduct={pressProduct} />
	const keyExtractor = (item) => `${item.id}`

	const pressProduct = (element) => {
		setCurrentObject({ ...element })
		setVisibleModal(true)
	}
	console.log(currentObject, 'CURROBJ')
	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={{ uri: storePoint.uri }}>
				<MapHeaderWhite title={'Баланс: введи циферки'} basket />
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{storePoint.title}</Text>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{storePoint.subtitle}</Text>
				</View>
			</ImageBackground>
			<View style={styles.withModal}>
				<FlatList
					style={styles.scroll}
					data={storePoint.data}
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
					<Image style={styles.img} source={{ uri: currentObject.image }} />
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={styles.titleText}>{currentObject.title}</Text>
						<Text style={styles.priceText}>{`${currentObject.price} ${profileState.currency}`}</Text>
					</View>
					<TouchableOpacity style={styles.button}>
						<Text>{'Добавить в корзину'}</Text>
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
