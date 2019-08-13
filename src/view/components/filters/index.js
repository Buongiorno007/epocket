import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'

import styles from './styles'
import route from '@services/route'
import FilterObject from '@containers/filters/filter-object'

function Filters({ mapPoints }) {
	const acceptFilters = () => {
		console.log('HELLO')
	}
	useEffect(() => {
		console.log(mapPoints.filters, 'FILTERS CHANGED')
	}, [mapPoints])

	const renderItem = ({ item }) => <FilterObject item={item} />
	const keyExtractor = (item) => `${item.title}`

	return (
		<View style={styles.container}>
			<MapHeaderPink title={'Фильтры'} use={acceptFilters} />
			<FlatList
				data={mapPoints.filters}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				extraData={mapPoints}
			/>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
	}
}

export default connect(mapStateToProps)(Filters)
