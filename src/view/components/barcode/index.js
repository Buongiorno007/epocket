import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import { connect } from 'react-redux'
import Barcode from 'react-native-barcode-builder'

function BarcodeComponent({ profileState }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0, y: 0 }
	const end = { x: 0, y: 1 }
	return (
		<View style={styles.container}>
			<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
				<MapHeaderWhite title={`Баланс: ${123123} ${profileState.currency}`} />
				<View style={styles.layout}>
					<Text style={styles.title}>{'Покажите этот код на кассе для оплаты'}</Text>
					<View style={styles.barcodeView}>
						<Barcode value={profileState.phone} format='CODE128' onError={(e) => {}} />
						<Text style={styles.barcodeText}>{`${profileState.phone}`}</Text>
					</View>
					<Text style={styles.subTitle}>
						{'Вы можете оплатить любой товар в этом магазине используя штрих-код'}
					</Text>
				</View>
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(BarcodeComponent)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	layout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	title: {
		fontFamily: 'Rubik-Bold',
		color: '#fff',
		fontSize: 24,
		marginBottom: 24,
		textAlign: 'center',
	},
	barcodeView: {
		padding: 30,
		backgroundColor: '#fff',
		borderRadius: 24,
	},
	barcodeText: {
		fontSize: 24,
		alignSelf: 'center',
	},
	subTitle: {
		fontFamily: 'Rubik-Regular',
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		marginTop: 24,
	},
})
