import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { formatDate } from '@services/format-date'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	time: string,
}

function Title({ time }) {
	return (
		<View style={styles.container}>
			<View style={styles.data}>
				<Text style={[styles.text, styles.title]}>{I18n.t('TRADE.DATE')}</Text>
				<Text style={[styles.text, styles.value]}>{formatDate(time)}</Text>
			</View>
			<View style={styles.line} />
		</View>
	)
}

const mapStateToProps = (state) => ({
	time: state.socket.time,
})

export default connect(mapStateToProps)(Title)
