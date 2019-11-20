import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { toHHMMSS } from '@services/convert-time'
import I18n from "@locales/I18n"

function MissionBanner({ missionState, top = 0 }) {
	return (
		<React.Fragment>
			{missionState.process && (
				<View style={[styles.timer, missionState.inRadius ? styles.timer_start : styles.timer_stop, {top: top}]}>
					<Text style={styles.title_text}>{missionState.title}</Text>
					<Text style={styles.time_text}>{`${toHHMMSS(
						missionState.inRadius ? missionState.timer : missionState.failTimer,
					)}`}</Text>
					{!missionState.inRadius && (
						<View style={styles.return_view}>
							<Text style={styles.title_text}>{`${I18n.t('GET_BACK')} ${toHHMMSS(
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
