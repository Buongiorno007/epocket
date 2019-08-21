import React, { useState, useEffect } from 'react'
import { View, FlatList, Animated, Easing, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'

import styles from './styles'
import FilterObject from '@containers/filters/filter-object'
import { isEqual } from 'lodash'

function Filters({ filters }) {
	const [stateFilters, setStateFilters] = useState(filters.data)
	const [different, setDifferent] = useState(false)

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

	// useEffect(() => {
	// 	if (different !== compare(stateFilters, filters.data)) setDifferent(!different)
	// }, [stateFilters])

	const compare = (firstArray, secondArray) => !isEqual(firstArray.sort(), secondArray.sort())

	const changeMarker = (id, deepId) => {
		let tempArray = []
		let tempDeepArray = []
		if (deepId) {
			for (let i = 0; i < stateFilters.length; i++) {
				let obj = { ...stateFilters[i] }
				if (obj.id === id) {
					for (let j = 0; j < obj.data.length; j++) {
						let deepObj = obj.data[j]
						if (deepObj.id === deepId) {
							deepObj.checked = !deepObj.checked
						}
						tempDeepArray.push(deepObj)
					}
					obj.data = [...tempDeepArray]
				}
				tempArray.push(obj)
			}
		} else {
			for (let i = 0; i < stateFilters.length; i++) {
				let obj = { ...stateFilters[i] }
				if (obj.id === id) {
					obj.checked = true
				} else {
					obj.checked = false
				}
				tempArray.push(obj)
			}
		}
		if (different !== compare(tempArray, filters.data)) setDifferent(!different)
		setStateFilters([...tempArray])
	}

	const resetFilters = () => {
		setStateFilters(filters.oldData)
	}

	const renderItem = ({ item }) => <FilterObject change={changeMarker} item={item} />
	const keyExtractor = (item) => `${item.id}`

	return (
		<View style={styles.container}>
			<MapHeaderPink title={'Фильтры'} use={different ? acceptFilters : null} />
			{different && (
				<View style={styles.reset}>
					<TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
						<Text style={styles.resetButtonText}>{'Сбросить фильтры'}</Text>
					</TouchableOpacity>
				</View>
			)}

			<FlatList
				style={styles.scroll}
				data={stateFilters}
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
