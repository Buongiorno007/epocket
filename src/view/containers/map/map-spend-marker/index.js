import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import { getStorePoint } from '@reducers/storePoint'

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
					<Image style={styles.img} source={{ uri: data.photo }} />
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
	img: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
})
