import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
import { connect } from 'react-redux'
import MyCarousel from '@containers/carousel'
const { width } = Dimensions.get('window')

function NewsDetails({ navigation, storePoint, profileState }) {
	const { name, time, link, details, images_links } = navigation.state.params
	return (
		<View style={styles.container}>
			<MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${storePoint.balance} ${profileState.currency}`} basket id={storePoint.id} />
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.time}>{time}</Text>
			{images_links.length ? <MyCarousel data={images_link} /> : <Image source={{ uri: link }} style={styles.image} resizeMode={'cover'} />}
			<Text style={styles.subtitle}>{details}</Text>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		storePoint: state.storePoint,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(NewsDetails)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginHorizontal: 16
	},
	title: {
		fontFamily: 'Rubik-Bold',
		color: '#111111',
		fontSize: 24,
		marginHorizontal: 16,
	},
	time: {
		fontFamily: 'Rubik-Regular',
		color: '#A6A6A6',
		fontSize: 13,
		marginTop: 8,
		marginHorizontal: 16,
	},
	image: {
		width: width - 32,
		height: (width - 32) * 0.56,
		borderRadius: 12,
		marginTop: 8,
		marginHorizontal: 16,
	},
	subtitle: {
		fontFamily: 'Rubik-Regular',
		color: '#111111',
		fontSize: 13,
		marginTop: 8,
		marginHorizontal: 16,
	},
})
