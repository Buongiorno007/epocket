import React from 'react'
import { View, Text, FlatList, ImageBackground, Dimensions } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'
import Accordion from '@containers/accordion'

function StorePoint({ storePoint }) {
	const renderItem = ({ item }) => <Accordion item={item} />
	const keyExtractor = (item) => `${item.id}`
	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={{ uri: storePoint.uri }}>
				<MapHeaderWhite title={'Баланс: введи циферки'} basket />
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{storePoint.title}</Text>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{storePoint.subtitle}</Text>
				</View>
			</ImageBackground>
			<FlatList
				style={styles.scroll}
				data={storePoint.data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
			/>
		</View>
	)
}

const mapStateToProps = (state) => ({
	storePoint: state.storePoint,
})

export default connect(mapStateToProps)(StorePoint)
