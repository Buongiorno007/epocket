import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'

const Logo = () => (
	<View style={styles.layout}>
		<View style={styles.logo}>
			<FastImage
				style={styles.image}
				source={require('@assets/img/brand.png')}
				resizeMode={FastImage.resizeMode.contain}
			/>
		</View>
	</View>
)

export default Logo
