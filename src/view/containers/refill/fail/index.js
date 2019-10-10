import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Button } from 'native-base'
import { colors } from '@constants/colors'
import I18n from '@locales/I18n'
import route from '@services/route'

const { width } = Dimensions.get('window')

export default function Fail() {
	const navigate = () => route.navigate('Main')
	return (
		<View style={styles.layout}>
			<Text style={styles.limit}>{I18n.t('REFILL.FAIL')}</Text>
			<Button rounded block style={styles.button} onPress={navigate}>
				<Text style={[styles.text]}>{I18n.t('OK')}</Text>
			</Button>
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
		color: colors.black111,
		textAlign: 'center',
	},
	button: {
		width: width * 0.5,
		backgroundColor: colors.blood_red,
		marginTop: 30,
		alignSelf: 'center',
	},
	text: {
		fontSize: 12,
		lineHeight: 12,
		fontFamily: 'Rubik-Medium',
		letterSpacing: 2,
		color: colors.white,
	},
})
