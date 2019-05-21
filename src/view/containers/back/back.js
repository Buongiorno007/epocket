import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
//constants
import styles from './styles'
import NavigationService from '../../../services/route'

class BackButton extends React.Component {
	render() {
		return (
			<Button transparent onPress={() => NavigationService.navigate(this.props.route)}>
				<View style={styles.header}>
					<View style={styles.arrow} />
					<Text style={styles.back_txt}>{this.props.title}</Text>
				</View>
			</Button>
		)
	}
}

export default BackButton
