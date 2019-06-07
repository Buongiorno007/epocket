import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import I18n from '@locales/I18n'
import BackButton from '@containers/back/back'

export default class AndroidHeader extends Component {
	render() {
		return (
			<View style={styles.headerBackground}>
				<View style={styles.headerButton}>
					<BackButton title={I18n.t('BACK')} route={this.props.route} />
				</View>
				<Text style={styles.headerTitle}>{this.props.title}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	headerTitle: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18,
	},
	headerBackground: {
		width: '100%',
		top: 0,
		paddingTop: 20,
		flexDirection: 'row',
		height: 62,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,.2)',
	},
	headerButton: {
		position: 'absolute',
		left: 0,
		top: 18,
	},
})
