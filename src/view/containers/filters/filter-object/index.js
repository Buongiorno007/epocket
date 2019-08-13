import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilterItem from '../filter-item'

export default function FilterObject({ item }) {
	const renderItem = (item, index) => <FilterItem key={`${index}`} item={item} index={index} />

	return (
		<>
			<View style={styles.header}>
				<Text>{item.title}</Text>
			</View>
			<View style={styles.items}>{item.data.map(renderItem)}</View>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 16,
		paddingTop: 24,
		paddingBottom: 8,
		backgroundColor: '#E5EDF7',
	},
	title: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: '#7C7C7C',
	},
	items: {
		paddingHorizontal: 16,
	},
})
