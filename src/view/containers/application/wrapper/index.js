import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loader from '@containers/application/loader'
import styles from './styles'
import NoInternet from '@containers/no-internet/no-internet'
import { setMissionTimer, setMissionFailtTimer, missionResult } from '@reducers/missionState'
import BackgroundTimer from 'react-native-background-timer'

type Props = {
	children: React.ReactChildren,
	trigger: Boolean,
	connection: Boolean,
}

function Wrapper({ children, trigger, connection, missionState, dispatch }: Props) {
	useEffect(() => {
		if (missionState.process) {
			this.startInterval()
		} else {
			BackgroundTimer.stopBackgroundTimer()
		}
	}, [missionState.process])

	startInterval = () => {
		BackgroundTimer.runBackgroundTimer(() => {
			this.timerTask()
		}, 1000)
	}

	timerTask = () => {
		if (missionState.timer && missionState.failTimer) {
			if (missionState.inRadius) {
				dispatch(setMissionTimer(missionState.timer - 1))
			} else {
				dispatch(setMissionFailtTimer(missionState.failTimer - 1))
			}
		} else {
			dispatch(missionResult())
			BackgroundTimer.stopBackgroundTimer()
		}
	}

	return (
		<View style={styles.layout}>
			{!connection && <NoInternet />}
			{trigger && <Loader />}
			{children}
		</View>
	)
}

const mapStateToProps = (state) => ({
	trigger: state.loader,
	connection: state.connection,
	missionState: state.missionState,
})

export default connect(mapStateToProps)(Wrapper)
