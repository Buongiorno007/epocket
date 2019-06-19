import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { ICONS } from '@constants/icons'
import FastImage from 'react-native-fast-image'
import I18n from '@locales/I18n'
import route from '@services/route'
import styles from './styles'

type Props = {
	shadow: string,
	price: string,
	trade: string,
	start: string,
	end: string,
}

type State = typeof initialState

const initialState = {
	currency: '',
}

class Mission extends React.Component<Props, State> {
	state = initialState

	componentDidMount() {
		this.init()
	}

	init() {
		const { coin } = this.props
		this.setState({ currency: coin })
	}

	navigate = () => {
		route.navigate('Main')
	}

	render() {
		const close = { uri: ICONS.COMMON.CLOSE }
		const { shadow, price, trade, start, end } = this.props
		const { currency } = this.state
		return (
			<View style={styles.layout}>
				<View style={styles.wrapper}>
					<View style={styles.size}>
						<Text style={styles.text}>
							{price} {I18n.t('EPC', { currency: currency })}
						</Text>
					</View>
				</View>
				<View style={[styles.wrapper, styles.info]}>
					<View style={styles.size}>
						<Text style={[styles.text, styles.title]}>{trade}</Text>
					</View>
					<Text style={[styles.text, styles.date]}>
						{start.substring(10, 16)} - {end.substring(10, 16)}
					</Text>
				</View>
				<View style={styles.wrapper}>
					<Button
						rounded
						transparent
						onPress={this.navigate}
						style={styles.button}
						androidRippleColor={shadow}
					>
						<FastImage style={styles.icon} resizeMode={FastImage.resizeMode.contain} source={close} />
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	coin: state.profileState.currency,
	shadow: state.userColor.card_shadow,
	price: state.selectedMission.price,
	trade: state.selectedMission.trade,
	start: state.selectedMission.date_start,
	end: state.selectedMission.date_end,
})

export default connect(
	mapStateToProps,
	null,
)(Mission)
