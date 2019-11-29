import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import { getStorePoint } from '@reducers/storePoint'
import { colors } from '@constants/colors'

function MapSpendMarker({ data, dispatch }) {
	const getProducts = () => {
		if (data.partners) {
		} else {
			dispatch(getStorePoint(data.id))
		}
	}

	return (
		<View>
			<Marker coordinate={data.location} onPress={getProducts}>
				<View style={styles.container}>
				<View style={styles.imageBorder}><Image style={styles.img} source={{ uri: data.photo }} /></View>
				</View>
			</Marker>
		</View>
	)
}

export default connect()(MapSpendMarker)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	imageBorder: {
		borderWidth: 2, 
		borderColor: colors.blood_red, 
		borderRadius: 24, 
		padding: 2, 
		width: 48, 
		height: 48, 
		backgroundColor: 'white', 
		justifyContent: 'center', 
		alignItems: 'center',
		overflow: 'hidden'
	},
	img: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
})
