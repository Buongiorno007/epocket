import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Marker } from 'react-native-maps'

function MapSpendMarker({ data }) {
	return (
		<View>
			<Marker coordinate={data.location} onPress={() => console.log(data.location, 'DATA LOCATION')}>
				<View style={styles.container}>
					<Image style={styles.img} source={{ uri: data.photo }} />
				</View>
			</Marker>
		</View>
	)
}

export default MapSpendMarker

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
