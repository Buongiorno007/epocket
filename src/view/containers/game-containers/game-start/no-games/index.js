import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'native-base'
import I18n from '@locales/I18n'
import styles from './styles'
import CustomButton from '@containers/custom-button/custom-button'

const NoGames = ({ currency }) => {
	return (
		<View style={styles.grad}>
			<View>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.BORING')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/bored.gif')} />
				<Text style={styles.game_cost_text}>{'К СОЖАЛЕНИЮ НА СЕГОДНЯ ИГР БОЛЬШЕ НЕТ'}</Text>
				<Text style={styles.visit}>{I18n.t('GAME.GET_EPC', { currency: currency })}</Text>
			</View>
		</View>
	)
}

export default NoGames
