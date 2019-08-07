import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import I18n from '@locales/I18n'

export default function Fail() {
	return (
		<View style={styles.layout}>
			<Text style={styles.limit}>{I18n.t('REFILL.FAIL')}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	layout: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	limit: {
		fontSize: 18,
		lineHeight: 22,
		fontFamily: 'Rubik-Regular',
		color: '#fff',
		textAlign: 'center',
	},
})
