import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import MapHeaderPink from '@containers/map/map-header-pink'
import FilterObject from '@containers/filters/filter-object'
import { isEqual } from 'lodash'
import { useFilters } from '@reducers/mapPoints'
import animation from '@constants/layout'
import styles from './styles'
import I18n from '@locales/I18n'

function Filters({ mapPoints, dispatch }) {
	const compare = (firstArray, secondArray) => !isEqual(firstArray.sort(), secondArray.sort())

	const [stateFilters, setStateFilters] = useState(mapPoints.filters)
	const [different, setDifferent] = useState(compare(mapPoints.filters, mapPoints.oldFilters))

	const acceptFilters = () => dispatch(useFilters(stateFilters))

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
		if (different !== compare(tempArray, mapPoints.oldFilters)) setDifferent(!different)
		animation()
		setStateFilters([...tempArray])
	}

	const resetFilters = async () => {
		await setDifferent(false)
		await animation()
		await setStateFilters(mapPoints.oldFilters)
	}

	const renderItem = ({ item }) => <FilterObject change={changeMarker} item={item} />
	const keyExtractor = (item) => `${item.id}`

	return (
		<View style={styles.container}>
			<MapHeaderPink title={I18n.t('FILTERS')} use={compare(stateFilters, mapPoints.filters) ? acceptFilters : null} />
			{different && (
				<View style={styles.reset}>
					<TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
						<Text style={styles.resetButtonText}>{I18n.t('FILTERS_RESET')}</Text>
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
