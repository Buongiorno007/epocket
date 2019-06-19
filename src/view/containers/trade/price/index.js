import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { formatNumber } from '@services/format-number'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	price: String,
}

function Price({ price }: Props) {
	return (
		<React.Fragment>
			<View style={styles.line} />
			<View style={styles.row}>
				<Text style={styles.text}>{I18n.t('TRADE.RESULT')}</Text>
				<Text style={styles.text}>{formatNumber(price)}</Text>
			</View>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => ({
	price: state.socket.total,
})

export default connect(mapStateToProps)(Price)
