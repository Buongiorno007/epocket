import React from 'react'
import { View, Text, FlatList, ImageBackground, Dimensions } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import styles from './styles'

function StorePoint({ storePoint }) {
	const uri =
		'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg'

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.image} source={{ uri: uri }}>
				<MapHeaderWhite title={'Баланс: введи циферки'} basket />
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{'ADIDAS'}</Text>
					<Text style={{ color: '#fff', textAlign: 'center' }}>{'Ул. Пушкина, дом Колотушкина'}</Text>
				</View>
			</ImageBackground>
			<FlatList style={styles.scroll}></FlatList>
		</View>
	)
}

const mapStateToProps = (state) => ({
	storePoint: state.storePoint,
})

export default connect(mapStateToProps)(StorePoint)
