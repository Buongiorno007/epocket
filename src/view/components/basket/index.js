import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import MapHeaderWhite from '@containers/map/map-header-white'
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function BasketComponent({ balance, profileState }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }
	return (
		<View style={styles.container}>
			<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
				<MapHeaderWhite title={`${I18n.t('CASH.TITLE')} ${balance} ${profileState.currency}`} />
			</LinearGradient>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		balance: state.balance,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(BasketComponent)
