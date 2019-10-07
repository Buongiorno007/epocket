import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//constants
import styles from './styles'
import I18n from '@locales/I18n'

class CashoutMessage extends React.Component {
	state = {
		currency: '',
	}

	componentDidMount() {
		this.setState({ currency: this.props.profileState.currency })
	}

	render = () => {
		return (
			<View style={styles.container}>
				<Text style={[styles.text, styles.title]}>
					{I18n.t('QRCODE.TITLE')}
					{this.props.total_price} {I18n.t('EPC', { currency: this.state.currency })}
				</Text>
				<Text style={[styles.text, styles.seller]}>{I18n.t('QRCODE.SELLER')}</Text>
			</View>
		)
	}
}
const mapStateToProps = (state) => ({
	profileState: state.profileState,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CashoutMessage)
