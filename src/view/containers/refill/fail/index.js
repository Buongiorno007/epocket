import React from 'react'
import { View, Text } from 'react-native'
import I18n from '@locales/I18n'
import styles from './styles'

function Fail() {
	return (
		<View style={styles.layout}>
			<Text style={styles.limit}>{I18n.t('REFILL.FAIL')}</Text>
		</View>
	)
}

export default Fail
