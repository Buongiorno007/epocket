import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import * as Animatable from 'react-native-animatable'
//constants
import styles from './styles'
import I18n from '@locales/I18n'

const git_url = '../../../assets/img/process.gif'
class Process extends React.Component {
	render = () => {
		return (
			<Animatable.View animation='fadeIn' duration={2000} style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.text}>{I18n.t('QRCODE.PROCESS')}</Text>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						source={require(git_url)}
						style={styles.image}
					/>
				</View>
			</Animatable.View>
		)
	}
}

export default Process
