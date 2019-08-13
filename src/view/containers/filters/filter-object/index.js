import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import FilterItem from '../filter-item'

export default function FilterObject({ item }) {
	const [title] = useState(item.title)

	const renderItem = ({ item, index }) => <FilterItem item={item} index={index} itemTitle={title} />
	const keyExtractor = (item) => `${item.id}`

	return (
		<>
			<View style={styles.header}>
				<Text>{item.title}</Text>
			</View>
			<View style={styles.items}>
				<FlatList scrollEnabled={false} data={item.data} keyExtractor={keyExtractor} renderItem={renderItem} />
			</View>
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
