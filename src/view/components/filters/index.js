import React, { useEffect } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'

import styles from './styles'
import route from '@services/route'
import FilterObject from '@containers/filters/filter-object'
import { useFilters } from '@reducers/mapPoints'

function Filters({ mapPoints, filters, dispatch }) {
	const acceptFilters = async () => {
		// let obj = {
		// 	type: false,
		// 	filters: [],
		// }
		// await mapPoints.filters.forEach((element, index) => {
		// 	if (index === 0) {
		// 		if (element.data[0].checked === element.data[1].checked) {
		// 			obj.type = false
		// 		} else {
		// 			element.data.forEach((item) => {
		// 				if (item.checked === true) obj.type = item.id
		// 			})
		// 		}
		// 	} else {
		// 		element.data.forEach((item) => {
		// 			item.checked === true && obj.filters.push(item.id)
		// 		})
		// 	}
		// })
		// dispatch(useFilters(JSON.stringify(obj)))
		console.log('FILTERS ACCEPTED')
	}

	useEffect(() => {
		console.log(filters, 'FILTERSSSSSSS')
	}, [filters])

	const renderItem = ({ item }) => <FilterObject item={item} />
	const keyExtractor = (item) => `${item.id}`

	return (
		<View style={styles.container}>
			<MapHeaderPink title={'Фильтры'} use={acceptFilters} />
			<FlatList
				style={styles.scroll}
				data={filters.data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				extraData={filters}
			/>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
		filters: state.filters,
	}
}

export default connect(mapStateToProps)(Filters)
