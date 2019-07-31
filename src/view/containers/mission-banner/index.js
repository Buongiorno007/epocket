import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { toHHMMSS } from '@services/convert-time'

function MissionBanner({ missionState }) {
	return (
		<React.Fragment>
			{missionState.process && (
				<View style={[styles.timer, missionState.inRadius ? styles.timer_start : styles.timer_stop]}>
					<Text style={styles.title_text}>{missionState.title}</Text>
					<Text style={styles.time_text}>{`${toHHMMSS(
						missionState.inRadius ? missionState.timer : missionState.failTimer,
					)}`}</Text>
					{!missionState.inRadius && (
						<View style={styles.return_view}>
							<Text style={styles.title_text}>{`вернитесь или вы потеряете прогресс ${toHHMMSS(
								missionState.timer,
							)}`}</Text>
						</View>
					)}
				</View>
			)}
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		missionState: state.missionState,
	}
}

export default connect(mapStateToProps)(MissionBanner)
