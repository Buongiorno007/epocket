import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import Header from '@containers/header'
import { connect } from 'react-redux'
import Barcode from 'react-native-barcode-builder'
import I18n from '@locales/I18n'
import { colors } from '@constants/colors'

function BarcodeComponent({ profileState, balance }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0, y: 0 }
	const end = { x: 0, y: 1 }
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				{/* <MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${balance} ${profileState.currency}`} /> */}
				<Header title={`${I18n.t('CASH.TITLE')} ${balance} ${profileState.currency}`}/>
				<View style={styles.layout}>
					<Text style={styles.title}>{I18n.t('HISTORY_PAGE.SHOW_THIS_BARCODE')}</Text>
					<View style={styles.barcodeView}>
						<Barcode value={profileState.phone} format='CODE128' onError={(e) => {}} />
						{/* <Text style={styles.barcodeText}>{`${profileState.phone}`}</Text> */}
					</View>
					<Text style={styles.subTitle}>
						{I18n.t('ANY_GOOD_BARCODE')}
					</Text>
				</View>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
		balance: state.balance,
	}
}

export default connect(mapStateToProps)(BarcodeComponent)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	layout: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	title: {
		fontFamily: 'Rubik-Bold',
		color: colors.black111,
		fontSize: 24,
		marginBottom: 24,
		textAlign: 'center',
	},
	barcodeView: {
		padding: 30,
		backgroundColor: '#fff',
		borderRadius: 24,
		...Platform.select({
			ios: {
				shadowOpacity: 0.2,
				shadowOffset: {
					width: 0.2,
					height: 2,
				},
				shadowColor: '#000000',
				shadowRadius: 2,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	barcodeText: {
		fontSize: 24,
		alignSelf: 'center',
	},
	subTitle: {
		fontFamily: 'Rubik-Regular',
		fontSize: 16,
		color: colors.black111,
		textAlign: 'center',
		marginTop: 24,
	},
})
