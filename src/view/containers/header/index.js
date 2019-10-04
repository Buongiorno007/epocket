import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'native-base'
import I18n from '@locales/I18n'
import BackButton from '@containers/back/back'
import styles from './styles'

type Props = {
	route?: string,
	title?: string,
}

export default function Header({ route = 'Main', title = '' }: Props) {
	return (
		<View style={styles.layout}>
			<View style={styles.wrapper}>
				<View style={[styles.action, styles.left]}>
					<BackButton title={''} route={route} />
				</View>
				<Button transparent disabled style={styles.body}>
					<Text style={[styles.title]} numberOfLines={1}>
						{title}
					</Text>
				</Button>
				<View style={[styles.action, styles.right]} />
			</View>
		</View>
	)
}
