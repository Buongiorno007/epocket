import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'

type Props = {
	phone: string,
	color: string,
}

function Success({ phone, color }: Props) {
	const navigate = () => route.navigate('Main')
	return (
		<View style={styles.layout}>
			<Text style={styles.thanks}>{I18n.t('REFILL.THANKS')}</Text>
			<Text style={styles.result}>{I18n.t('REFILL.SUCCESS')}</Text>
			<Text style={styles.phone}>{`${phone}`}</Text>
			<Button rounded block style={styles.button} onPress={navigate}>
				<Text style={[styles.text, { color }]}>{I18n.t('OK')}</Text>
			</Button>
		</View>
	)
}

const mapStateToProps = (state) => ({
	color: state.userColor.second_gradient_color,
	phone: state.bonuses.phone,
})

export default connect(
	mapStateToProps,
	null,
)(Success)
