import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { colors } from '@constants/colors'

export default function TittleSmallText({text = "", styleContainer = {}, styleText = {}}) {
	return(
		<View style={[styles.tittle_small, styleContainer]}>
			{/* <Image style={styles.tittle_small_img} source={require('@assets/img/e-ico.png')}  resizeMode={'contain'}/> */}
			<Text style={[styles.tittle_small_text, styleText]}>{text}</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	tittle_small: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},
	tittle_small_img: {
		width: 16,
		height: 16,
		marginRight: 8,
	},
	tittle_small_text: {
		fontFamily: 'Rubik-Medium',
		fontSize: 15,
		color: colors.black111,
	},
})

