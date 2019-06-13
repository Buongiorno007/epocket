import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loader from '@containers/application/loader'
import styles from './styles'
import NoInternet from '@containers/no-internet/no-internet'

type Props = {
	children: React.ReactChildren,
	trigger: Boolean,
	connection: Boolean,
}

function Wrapper({ children, trigger, connection }: Props) {
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
})

export default connect(mapStateToProps)(Wrapper)
