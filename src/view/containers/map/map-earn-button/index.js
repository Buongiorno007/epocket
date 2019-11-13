import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '@constants/colors'
import I18n from '@locales/I18n'

function MapEarnButton({ img, text, callback, space = false, pub = false, profileState, games }) {
    let games_aval = Number(games.available_game_len)
    let game_price = Number(games.award)
    let total_games_price = Math.ceil(games_aval * game_price)

    let total_post_price = 0

	return (
		<TouchableOpacity style={[styles.touchStyle, space && styles.space]} onPress={callback}>
			<Image style={styles.img} source={img} />
			<View>
				<Text style={styles.text}>{text}</Text>			
				{pub ? (
					<Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.PUB_AVAL')}`}</Text>
				) : (
					<Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.GAMES_AVAL')}`}</Text>
				)}
			</View>
			<View style={styles.priceContainer}>
				<View style={styles.price}>
					{pub ? (
						<Text style={[styles.text, styles.price_positive]}>
							{`+ ${total_post_price} ${profileState.currency}`}
						</Text>
					) : (
						<Text style={[styles.text, styles.price_positive]}>
							{`+ ${total_games_price} ${profileState.currency}`}
						</Text>
					)}
					{pub && <View style={styles.arrow} />}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const mapStateToProps = state => {
	return {
        profileState: state.profileState,
        games: state.gameStart
	}
}
export default connect(mapStateToProps)(MapEarnButton)

const styles = StyleSheet.create({
	touchStyle: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: colors.gray_e6,
		borderRadius: 12
	},
	img: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 17,
		color: colors.black111,
		flexGrow: 1,
	},
	textSmall: {
		fontFamily: 'Rubik-Regular',
		fontSize: 13,
		color: colors.gray_b1,
	},
	arrow: {
		width: 12,
		height: 12,
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderColor: colors.white,
		transform: [{ rotate: '45deg' }],
	},
	space: {
		marginTop: 16,
	},
	priceContainer: {		
		marginLeft: 'auto',
	},
	price: {
		minWidth: 60, 
		maxHeight: 28,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 7,
		borderRadius: 20,
		backgroundColor: colors.blood_red
	},
	price_positive: {
		color: colors.white,
	},
})