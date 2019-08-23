import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'
import FilterObject from '@containers/filters/filter-object'
import { isEqual } from 'lodash'
import { useFilters } from '@reducers/mapPoints'
import animation from '@constants/layout'
import styles from './styles'

function Filters({ mapPoints, dispatch }) {
	const [stateFilters, setStateFilters] = useState(mapPoints.filters)
	const [different, setDifferent] = useState(false)

	const acceptFilters = () => dispatch(useFilters(stateFilters))

	const compare = (firstArray, secondArray) => !isEqual(firstArray.sort(), secondArray.sort())

	const changeMarker = (id, deepId) => {
		let tempArray = []
		let tempDeepArray = []
		if (deepId) {
			for (let i = 0; i < stateFilters.length; i++) {
				let obj = { ...stateFilters[i] }
				if (obj.id === id) {
					for (let j = 0; j < obj.data.length; j++) {
						let deepObj = { ...obj.data[j] }
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
		if (different !== compare(tempArray, mapPoints.filters)) setDifferent(!different)
		animation()
		setStateFilters([...tempArray])
	}

	const resetFilters = async () => {
		await setDifferent(false)
		await animation()
		await setStateFilters(mapPoints.filters)
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
