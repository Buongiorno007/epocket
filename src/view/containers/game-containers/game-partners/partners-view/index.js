import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'

function PartnersView() {
	return (
		<View style={styles.container}>
			<Text style={styles.visit_partners}>{'Посети сайт партнеров'}</Text>
			<View style={styles.brands}>
				<Text>{'HERE WILL BE BRANDS'}</Text>
			</View>
			<TouchableOpacity style={styles.visit_trc}>
				<Text style={styles.visit_trc_text}>{'Или посети ближайший ТРЦ'}</Text>
			</TouchableOpacity>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameProcess: state.gameProcess,
	}
}

export default connect(mapStateToProps)(PartnersView)
