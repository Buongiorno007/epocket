import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loader from '@containers/application/loader'
import styles from './styles'

const Wrapper = ({ children, trigger }) => (
	<View style={styles.layout}>
		{trigger && <Loader />}
		{children}
	</View>
)

const mapStateToProps = (state) => ({
	trigger: state.loader,
})

export default connect(mapStateToProps)(Wrapper)
