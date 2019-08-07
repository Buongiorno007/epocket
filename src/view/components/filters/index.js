import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'

import styles from './styles'
import route from '@services/route'

function Filters({ filters }) {
	return (
		<View style={styles.container}>
			<MapHeaderPink title={'Фильтры'} />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
	}
}

export default connect(mapStateToProps)(Filters)