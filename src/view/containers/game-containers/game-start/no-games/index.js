import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import styles from './styles'
import route from '@services/route'
import CustomButton from '@containers/custom/custom-button/custom-button'

const NoGames = ({ profileState }) => {
	return (
		<View style={styles.grad}>
			<TouchableOpacity style={[styles.game_aval]} onPress={() => {route.navigate('Main')}}>
				<Image style={styles.game_aval_img} source={require('@assets/img/arrow-black-left.png')} resizeMode={'contain'} />
				<Image style={styles.game_aval_img} source={require('@assets/img/close_black.png')} resizeMode={'contain'} />
			</TouchableOpacity>
			<View style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
				<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.BORING')}</Text>
				<Image style={styles.zifi} source={require('@assets/img/zifi/bored.gif')} />
				<Text style={styles.game_cost_text}>{`${I18n.t('GAME.SORRY_TODAY')} ${I18n.t('GAME.NO_GAMES')}`}</Text>
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
