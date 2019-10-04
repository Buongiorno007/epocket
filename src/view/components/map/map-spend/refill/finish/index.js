import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@containers/header'
import Success from '@containers/refill/success'
import Fail from '@containers/refill/fail'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'

type Props = {
	first: string,
	second: string,
} & typeof defaultProps

const defaultProps = {
	start: { x: 0.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

export default class RefillFinish extends React.Component<Props> {
	static defaultProps = defaultProps

	componentDidMount() {
		route.goBackPress('Main')
	}

	render() {
		const { start, end } = this.props
		const colors = ['#F55890', '#FF9950']
		const { condition } = this.props.navigation.state.params
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header />
				{condition === 'success' ? <Success /> : <Fail />}
			</LinearGradient>
		)
	}
}
