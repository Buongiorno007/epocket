import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'

function MapEarnButton({ img, text, callback, space = false, pub = false, profileState, games }) {
    let games_aval = Number(games.available_game_len)
    let game_price = Number(games.award)
    let total_games_price = games_aval * game_price

    let total_post_price = 0

	return (
		<TouchableOpacity style={[styles.touchStyle, space && styles.space]} onPress={callback}>
			<Image style={styles.img} source={img} />
			<Text style={styles.text}>{text}</Text>			
            {pub ? (
                <Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.PUB_AVAL')}`}</Text>
            ) : (
                <Text style={styles.textSmall}>{`${games_aval} ${I18n.t('EARN.GAMES_AVAL')}`}</Text>
            )}
			<View>
				<View style={styles.priceContainer}>
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {
		width: 40,
		height: 40,
		marginRight: 16,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: '#404140',
		flexGrow: 1,
	},
	arrow: {
		width: 12,
		height: 12,
		borderTopWidth: 2,
		borderRightWidth: 2,
		borderColor: '#404140',
		transform: [{ rotate: '45deg' }],
	},
	space: {
		marginTop: 16,
	},
})
