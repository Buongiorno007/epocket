import React, { Component } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
//constants
import styles from './styles'

{
	/* 
call example
status - default false (will be shown icon), if true will be shown photo from src
src - photo's source 

<CustomPhoto status={this.state.user.status} src={this.state.user.photo}/>

*/
}
export default class CustomPhoto extends Component {
	render() {
		return (
			<View style={styles.photo_container}>
				<View style={styles.img_container}>
					<FastImage
						style={styles.photo}
						resizeMode={FastImage.resizeMode.сover}
						source={{ uri: 'data:image/jpeg;base64,' + this.props.src }}
					/>
				</View>
				{this.props.edit && (
					<Button transparent style={styles.button_container} onPress={() => this.props.photoEdit()} />
				)}
			</View>
		)
	}
}
