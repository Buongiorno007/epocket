import React, { useState } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'

import styles from './styles'
import route from '@services/route'
import FilterObject from '@containers/filters/filter-object'
import { useFilters } from '@reducers/mapPoints'

function Filters({ mapPoints, dispatch }) {
	const [fil, setFil] = useState(mapPoints.filters)

	const acceptFilters = async () => {
		let obj = {
			type: false,
			filters: [],
		}
		await mapPoints.filters.forEach((element, index) => {
			if (index === 0) {
				if (element.data[0].checked === element.data[1].checked) {
					obj.type = false
				} else {
					element.data.forEach((item) => {
						if (item.checked === true) obj.type = item.id
					})
				}
			} else {
				element.data.forEach((item) => {
					item.checked === true && obj.filters.push(item.id)
				})
			}
		})
		dispatch(useFilters(JSON.stringify(obj)))
	}

	const renderItem = (item, index) => <FilterObject key={`${index}`} item={item} />

	const changeCheckbox = (id) => {
		let obj = fil.forEach((element) => {
			element.data.forEach((item) => {
				if (item.id === id) item.checked = !item.checked
			})
		})
		setFil(obj)
	}

	return (
		<View style={styles.container}>
			<MapHeaderPink title={'Фильтры'} use={acceptFilters} />
			<ScrollView>{mapPoints.filters.map(renderItem)}</ScrollView>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
	}
}

export default connect(mapStateToProps)(Filters)
