import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'

const Navigate = () => {
	const colors = ['#FF9950', '#F55890']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 1.0, y: 0.0 }

	const sign_in = () => route.navigate('SignIn')
	const sign_up = () => route.navigate('SignUp')

	return (
		<View style={styles.layout}>
			<Button full rounded style={styles.button} onPress={sign_up}>
				<LinearGradient colors={colors} start={start} end={end} style={styles.gradient}>
					<Text uppercase style={[styles.text, styles.sign_up]}>
						{I18n.t('SIGN_UP_TITLE')}
					</Text>
				</LinearGradient>
			</Button>
			<Button full rounded style={styles.button} onPress={sign_in}>
				<Text uppercase style={[styles.text]}>
					{I18n.t('SIGN_IN_TITLE')}
				</Text>
			</Button>
		</View>
	)
}

export default Navigate
