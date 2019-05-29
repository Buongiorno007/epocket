import React from 'react'
import { View, Text } from 'react-native'
//constants
import styles from './styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatItem } from '../../../services/format-hastags'

class InstaHashTags extends React.Component {
	componentDidMount = () => {}

	render = () => {
		return (
			<View style={styles.container}>
				<Text style={styles.items}>{formatItem(this.props.hashtags)} </Text>
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
)(InstaHashTags)
