import React from 'react'
import { Text, View } from 'react-native'
import I18n from '@locales/I18n'
import BackButton from '@containers/back/back'
import styles from './styles'

type Props = {
	route?: string,
	title?: string,
}

const Header = ({ route, title }: Props) => {
	return (
		<View style={styles.layout}>
			<View style={styles.wrapper}>
				<View style={[styles.action, styles.left]}>
					<BackButton title={I18n.t('BACK')} route={route} />
				</View>
				<View style={[styles.body]}>
					<Text style={[styles.title]} numberOfLines={1}>
						{title}
					</Text>
				</View>
				<View style={[styles.action, styles.right]} />
			</View>
		</View>
	)
}

export default Header
