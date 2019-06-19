import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setActiveCard } from '@reducers/set-active-card'
import Safe from '@containers/application/safe'
import Title from '@containers/scanner/title'
import Mission from '@containers/scanner/mission'
import Camera from '@containers/scanner/camera'
import route from '@services/route'
import styles from './styles'

class Scanner extends React.Component {
	componentDidMount() {
		this.props.setActiveCard(false)
		route.goBackPress('Main')
	}

	render() {
		return (
			<Safe color={'#F8F6F4'}>
				<View style={styles.layout}>
					<Mission />
					<Title />
					<Camera />
				</View>
			</Safe>
		)
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setActiveCard,
		},
		dispatch,
	)

export default connect(
	null,
	mapDispatchToProps,
)(Scanner)
