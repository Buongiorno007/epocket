import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import MapHeader from '@containers/map/map-header'

import styles from './styles'
import route from '@services/route'

function Filters({ filters }) {
	return (
		<View style={styles.container}>
			<MapHeader title={'Фильтры'} />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
	}
}

export default connect(mapStateToProps)(Filters)
