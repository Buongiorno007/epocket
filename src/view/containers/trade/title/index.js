import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { formatDate } from '@services/format-date'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	time: string,
}

function Title({ time }: Props) {
	return (
		<React.Fragment>
			<View style={styles.row}>
				<Text style={styles.text}>{I18n.t('TRADE.DATE')}</Text>
				<Text style={[styles.text, styles.price]}>{formatDate(time)}</Text>
			</View>
			<View style={styles.line} />
		</React.Fragment>
	)
}

const mapStateToProps = (state) => ({
	time: state.socket.time,
})

export default connect(mapStateToProps)(Title)
