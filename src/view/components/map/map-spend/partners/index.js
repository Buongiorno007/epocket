import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import MapHeaderWhite from '@containers/map/map-header-white'
import PartnerCard from '@containers/partner-button'
import I18n from '@locales/I18n'

function Partnrs({ partners }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	const renderItem = ({ item }) => {
		return <PartnerCard item={item} />
	}
	const keyExtractor = (item) => {
		return `${item.id}`
	}

	return (
		<View style={styles.container}>
			<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
				<MapHeaderWhite title={I18n.t('PARTNERS.ONLINE_SHOPS')} />
				<View style={styles.container}>
					<View style={styles.textContainer}>
						<Text style={styles.text}>{I18n.t('PARTNERS.ONLINE_SHOP_HERE')}</Text>
					</View>
					<FlatList
						style={styles.scroll}
						data={partners.online}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
					/>
				</View>
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		partners: state.partners,
	}
}

export default connect(mapStateToProps)(Partnrs)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},
	textContainer: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		backgroundColor: '#E5EDF7',
	},
})
