import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import FilterItem from '../filter-item'
import { changeMark } from '@reducers/filters'
import { connect } from 'react-redux'

function FilterObject({ item, dispatch }) {
	const renderItem = (item, index) => <FilterItem key={`${index}`} item={item} index={index} />
	console.log(item, 'ITEMMMMMM')
	return (
		<>
			<TouchableOpacity
				disabled={item.checked}
				style={styles.container}
				onPress={() => dispatch(changeMark(item.id))}
			>
				<Image source={{ uri: item.image }} style={styles.image} />
				<Text style={styles.text}>{item.name}</Text>
				<Text>{`${item.checked}`}</Text>
			</TouchableOpacity>
			{item.data && item.checked && <View style={styles.items}>{item.data.map(renderItem)}</View>}
		</>
	)
}

export default connect()(FilterObject)

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
	},
	text: {
		fontFamily: 'Rubik-Regular',
		fontSize: 14,
		color: '#404140',
		flexGrow: 1,
	},
	items: {
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: 'rgba(112, 112, 112, 0.3)',
	},
})
