import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'

function MissionBanner({ missionState }) {
	return (
		<>
			{(missionState.inRadius || missionState.declineTimer) && (
				<View style={[styles.timer, missionState.inRadius ? styles.timer_start : styles.timer_stop]}>
					<Text style={styles.title_text}>mission title</Text>
					<Text style={styles.time_text}>12:34:50</Text>
					{!missionState.inRadius && (
						<View style={styles.return_view}>
							<Text style={styles.title_text}>вернитесь или вы потеряете прогресс 12:34:50</Text>
						</View>
					)}
				</View>
			)}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		missionState: state.missionState,
	}
}

export default connect(mapStateToProps)(MissionBanner)
