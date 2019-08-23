import React, { useState, useRef } from 'react'
import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'
import Modal from 'react-native-modalbox'

function StorePoint({ storePoint }) {
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
					style={{
						flex: 1,
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						backgroundColor: 'rgba(255, 255, 255, 0.95)',
						overflow: 'hidden',
					}}
					swipeThreshold={10}
					backdrop={false}
					position={'bottom'}
					backdropPressToClose={false}
					isOpen={visibleModal}
					onClosed={() => setVisibleModal(false)}
				>
					<Image
						style={{ width: 375, height: 200, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
						source={{ uri: currentObject.image }}
					/>
					<Text>{currentObject.title}</Text>
					<Text>{currentObject.price}</Text>
				</Modal>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => ({
	storePoint: state.storePoint,
})

export default connect(mapStateToProps)(StorePoint)
