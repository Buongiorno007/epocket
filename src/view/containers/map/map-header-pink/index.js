import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import route from '@services/route'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'

function MapHeaderPink({ title = I18n.t('MAP.PLACES'), filters = false, use, mapPoints }) {
	const goToFilters = () => {
		mapPoints.filters.length ? route.push('Filters') : console.log('FILTERS NOT available')
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => route.pop()}>
				<Image source={require('@assets/img/chevron.png')} style={styles.image} />
			</TouchableOpacity>
			<Text style={styles.text}>{title}</Text>
			{filters ? (
				<TouchableOpacity onPress={goToFilters}>
					<Image source={require('@assets/img/filter.png')} style={styles.image} />
				</TouchableOpacity>
			) : use ? (
				<TouchableOpacity onPress={() => use()}>
					<Text style={styles.text}>{'OK'}</Text>
				</TouchableOpacity>
			) : (
				<View style={styles.image} />
			)}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
	}
}

export default connect(mapStateToProps)(MapHeaderPink)

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
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 16,
		color: '#F63272',
	},
})
