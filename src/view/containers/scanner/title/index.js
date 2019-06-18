import React from 'react'
import { Text } from 'react-native'
import I18n from '@locales/I18n'
import styles from './styles'

function Title() {
	return (
		<React.Fragment>
			<Text style={styles.please}>{I18n.t('SCANNER.PLEASE')}</Text>
			<Text style={styles.text}>{I18n.t('SCANNER.TEXT')}</Text>
		</React.Fragment>
	)
}

export default Title
