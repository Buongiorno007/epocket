import React from 'react'
import { View, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { BlurView } from '@react-native-community/blur'

function Loader() {
	const pic = require('@assets/img/preloader_nobg.gif')
	return (
		<View style={styles.layout}>
			{Platform.OS === 'ios' && <BlurView style={styles.blur} blurType='light' blurAmount={8} />}
			<FastImage resizeMode={FastImage.resizeMode.contain} source={pic} style={styles.loader} />
		</View>
	)
}

export default Loader
