import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//constants
import styles from './styles'
import NavigationService from '@services/route'
//reducers
import { loaderState } from '@reducers/loader'

class BackButton extends React.Component {
	render() {
		return (
			<Button
				transparent
				onPress={() => {
					NavigationService.navigate(this.props.route)
				}}
			>
				<View style={styles.header}>
					<View style={styles.arrow} />
					<Text style={styles.back_txt}>{this.props.title}</Text>
				</View>
			</Button>
		)
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
		},
		dispatch,
	)

export default connect(
	null,
	mapDispatchToProps,
)(BackButton)
