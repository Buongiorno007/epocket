import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
//constants
import styles from './styles'
import I18n from '@locales/I18n'

// const gif_url = '@assets/img/wifi.gif'
class NoInternet extends React.Component {
	render() {
		return (
			<View style={styles.no_internet}>
				<Text style={styles.purple_text}>{I18n.t('NO_INTERNET')}</Text>
				<FastImage
					resizeMode={FastImage.resizeMode.contain}
					style={styles.no_internet_image}
					source={require('@assets/img/wifi.gif')}
				/>
			</View>
		)
	}
}

export default NoInternet
