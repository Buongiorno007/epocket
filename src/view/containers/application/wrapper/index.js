import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loader from '@containers/application/loader'
import styles from './styles'
import NoInternet from '@containers/no-internet/no-internet'
import { setMissionTimer, setMissionFailtTimer } from '@reducers/missionState'
type Props = {
	children: React.ReactChildren,
	trigger: Boolean,
	connection: Boolean,
}

function Wrapper({ children, trigger, connection, missionState, dispatch }: Props) {
	const [timer, setTimer] = useState(0)
	const [failTimer, setFailTimer] = useState(0)

	// let timerInterval = null
	// let failTimerInterval = null

	useEffect(() => {
		setTimer(missionState.timer)
		setFailTimer(missionState.failTimer)
	}, [missionState.outletId])

	useEffect(() => {
		if (timer) {
			if (missionState.inRadius) {
				let timerInterval = setTimeout(() => {
					setTimer(timer - 1)
					dispatch(setMissionTimer(timer - 1))
				}, 1000)
			} else {
				setFailTimer(failTimer - 1)
				dispatch(setMissionFailtTimer(failTimer - 1))
			}
		}
	}, [timer])

	useEffect(() => {
		console.log(failTimer, missionState.inRadius, 'FAILTIMER AND MISSION STATE IN RADIUS')
		if (failTimer) {
			if (!missionState.inRadius) {
				let failTimerInterval = setTimeout(() => {
					setFailTimer(failTimer - 1)
					dispatch(setMissionFailtTimer(failTimer - 1))
				}, 1000)
			} else {
				setTimer(timer - 1)
				dispatch(setMissionTimer(timer - 1))
			}
		}
	}, [failTimer])

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
