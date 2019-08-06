import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'

export default function MapPlacesHeader() {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => route.pop()}>
				<Image source={require('@assets/img/chevron.png')} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{'МЕСТА НА КАРТЕ'}</Text>
			<TouchableOpacity onPress={() => route.pop()}>
				<Image source={require('@assets/img/filter.png')} style={styles.image} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 90,
		paddingHorizontal: 16,
		paddingTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	image: {
		width: 20,
		resizeMode: 'center',
		height: 20,
	},
})
