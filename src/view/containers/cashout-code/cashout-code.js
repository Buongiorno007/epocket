import React from 'react'
import { View, Dimensions } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
//constants
import styles from './styles'
import { colors } from '../../../constants/colors'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const { width, height } = Dimensions.get('window')
class CashoutCode extends React.Component {
	static defaultProps = {
		link: 'http://facebook.github.io/react-native/',
	}

	render = () => {
		return (
			<View style={styles.container}>
				<QRCode
					value={this.props.link}
					size={width * 0.65}
					color={this.props.userColor.black}
					backgroundColor={this.props.userColor.white}
				/>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CashoutCode)
