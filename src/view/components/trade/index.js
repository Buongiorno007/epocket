import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Status from '@containers/trade/status'
import Title from '@containers/trade/title'
import Price from '@containers/trade/price'
import List from '@containers/trade/list'
import Safe from '@containers/application/safe'
import Touchable from '@containers/custom-button/custom-button'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'

class Trade extends React.Component {
	navigate = () => {
		route.navigate('Main')
	}

	render() {
		const { white, status } = this.props
		const check = status === -1
		return (
			<Safe color={'#F8F6F4'}>
				<View style={styles.layout}>
					<Status />
					<Title />
					<List />
					{!check && <Price />}
				</View>
				<Touchable
					active
					gradient
					short
					title={I18n.t('OK').toUpperCase()}
					color={white}
					handler={this.navigate}
				/>
			</Safe>
		)
	}
}

const mapStateToProps = (state) => ({
	white: state.userColor.white,
	status: state.socket.status,
})

export default connect(mapStateToProps)(Trade)
