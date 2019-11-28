import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '@constants/colors'
import I18n from '@locales/I18n'

const { width } = Dimensions.get('window')

function MapEarnButton({ img, text, callback, space = false, pub , arrow = false, profileState, mallTask, games }) {
    let games_aval = Number(games.available_game_len)
    let game_price = Number(games.award)
    let total_games_price = games_aval * game_price

	let posts_aval = Number(mallTask.tasks.length)
	let post_price = 0
	mallTask.tasks.map((item) => {post_price += Number(item.price.substring(1))})
    let total_post_price = 0

	return (
		<TouchableOpacity style={[styles.touchStyle, space && styles.space]} onPress={callback}>
			<Image style={styles.img} source={img} />
			<View>
				<Text style={[styles.text, {width: (width - 30) / 2}]} ellipsizeMode={'tail'} numberOfLines={1}>{text}</Text>
				{pub === 'games' && <Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.GAMES_AVAL')}`}</Text>}			
				{pub === 'publications' && <Text style={styles.textSmall}>{`${posts_aval} ${I18n.t('EARN.PUB_AVAL')}`}</Text>}			
				{pub === 'advert_friend' && <Text style={styles.textSmall}>{`+5 ${profileState.currency} ${I18n.t('REF_LINK.FOR_YOU_AND_YOUR_FRIEND2')}`}</Text>}			
				{pub === 'advert_advert' && <Text style={styles.textSmall}>{`+${I18n.t('REF_LINK.CASHBACK')}`}</Text>}			
				{/* {pub ? (
					<Text style={styles.textSmall}>{`${posts_aval} ${I18n.t('EARN.PUB_AVAL')}`}</Text>
				) : (
					<Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.GAMES_AVAL')}`}</Text>
				)} */}
			</View>
			<View style={styles.priceContainer}>
				<View style={styles.price}>
				{pub === 'games' && <Text style={[styles.text, styles.price_positive]}>{`+ ${Number(games.award_total).toFixed(1)} ${profileState.currency}`}</Text>}			
				{pub === 'publications' && <Text style={[styles.text, styles.price_positive]}>{`+ ${post_price} ${profileState.currency}`}</Text>}			
				{pub === 'advert_friend' && <Text style={[styles.text, styles.price_positive]}>{`+ 5 ${profileState.currency}`}</Text>}			
				{pub === 'advert_advert' && <Text style={[styles.text, styles.price_positive]}>{`+ 50$`}</Text>}			
					{/* {pub ? (
						<Text style={[styles.text, styles.price_positive]}>{`+ ${post_price} ${profileState.currency}`}</Text>
					) : (
						<Text style={[styles.text, styles.price_positive]}>{`+ ${total_games_price.toFixed(1)} ${profileState.currency}`}</Text>
					)} */}
					{arrow && <View style={styles.arrow} />}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const mapStateToProps = state => {
	return {
        profileState: state.profileState,
		games: state.gameStart,
		mallTask: state.mallTask
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
