import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button } from "native-base"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import Touchable from '@containers/custom/custom-button/custom-button'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	pink: string,
	white: string,
} & defaultProps

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class CatCode extends React.Component<Props> {
	static defaultProps = defaultProps

	navigate = () => {
		route.navigate('Main')
	}

	render = () => {
		const { colors, start, end, pink, white } = this.props
		const color = true ? pink : white
		return (
			<View style={styles.layout}>
				<Image style={styles.image} source={require('@assets/img/cat.png')} />
				<Text style={styles.title}>{I18n.t('SIGN.CONGRATULATION')}</Text>
				{/* <Touchable color={colors.blood_red} handler={this.navigate} active={true} title={I18n.t('SIGN.START')} /> */}
				<Button full rounded style={[styles.button]} onPress={this.navigate}>
					<Text style={[styles.text]}>
						{I18n.t('SIGN.START')}
					</Text>
				</Button>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	pink: state.userColor.pink,
	white: state.userColor.white,
})

export default connect(
	mapStateToProps,
	null,
)(CatCode)
