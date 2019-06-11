import React from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import styles from './styles'
import CustomButton from '@containers/custom-button/custom-button'

const NoGames = ({ profileState }) => {
	return (
		<View style={styles.grad}>
			<View>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.BORING')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/bored.gif')} />
				<Text style={styles.game_cost_text}>{'К СОЖАЛЕНИЮ НА СЕГОДНЯ ИГР БОЛЬШЕ НЕТ'}</Text>
				<Text style={styles.visit}>{I18n.t('GAME.GET_EPC', { currency: profileState.currency })}</Text>
			</View>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(NoGames)
