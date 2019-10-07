import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { setTopTabs } from '@reducers/topTabs'
import I18n from '@locales/I18n'

import styles from './styles'

function TopTabBar({ topTabs, dispatch }) {
	const colors = ['#FF9950', '#F55890']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 1.0, y: 0.0 }

	return (
		<View style={styles.container}>
			<TouchableOpacity
				disabled={topTabs === 0}
				style={styles.button}
				onPress={() => {
					dispatch(setTopTabs(0))
				}}
			>
				{topTabs === 0 && <LinearGradient start={start} end={end} colors={colors} style={styles.gradient} />}
				<Text style={[styles.text, topTabs === 0 && styles.text_active]}>{I18n.t('EARN')}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={topTabs === 1}
				style={styles.button}
				onPress={() => {
					dispatch(setTopTabs(1))
				}}
			>
				{topTabs === 1 && <LinearGradient start={start} end={end} colors={colors} style={styles.gradient} />}
				<Text style={[styles.text, topTabs === 1 && styles.text_active]}>{I18n.t('SPEND')}</Text>
			</TouchableOpacity>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		topTabs: state.topTabs,
	}
}

export default connect(mapStateToProps)(TopTabBar)
