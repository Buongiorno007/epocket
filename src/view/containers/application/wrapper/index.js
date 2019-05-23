import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loader from '@containers/application/loader'
import styles from './styles'
import NoInternet from '@containers/no-internet/no-internet'

const Wrapper = ({ children, trigger, isConnected }) => (
	<View style={styles.layout}>
		{!isConnected && <NoInternet />}
		{trigger && <Loader />}
		{children}
	</View>
)

const mapStateToProps = (state) => ({
	trigger: state.loader,
	isConnected: state.isConnected,
})

export default connect(mapStateToProps)(Wrapper)
