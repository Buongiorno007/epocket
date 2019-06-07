import React from 'react'
import { View, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/androidHeader/androidHeader'
import BackButton from '@containers/back/back'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = typeof defaultProps

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class SignIn extends React.Component {
	static defaultProps = defaultProps

	render = () => {
		const { colors, start, end } = this.props
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header route='Start' title={I18n.t('SIGN_IN_TITLE')} />
			</LinearGradient>
		)
	}
}

export default SignIn
