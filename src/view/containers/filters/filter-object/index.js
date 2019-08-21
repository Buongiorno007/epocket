import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

export default function FilterObject({ item, change }) {
	const renderItem = (element, index) => (
		<TouchableOpacity
			key={`${index}`}
			onPress={() => change(item.id, element.id)}
			style={[styles.block, index && styles.borderBlock]}
		>
			<Image source={{ uri: element.image }} style={styles.image} />
			<Text style={styles.text}>{element.name}</Text>
			<View style={[styles.checkBox, element.checked && styles.activated]}>
				<Image style={styles.mark} source={require('@assets/img/mark.png')} />
			</View>
		</TouchableOpacity>
	)
	return (
		<>
			<TouchableOpacity disabled={item.checked} style={styles.container} onPress={() => change(item.id)}>
				<Image source={{ uri: item.image }} style={styles.image} />
				<Text style={styles.text}>{item.name}</Text>
				<View style={[item.checked ? styles.circleActive : styles.circle]}>
					{item.checked && <View style={styles.point}></View>}
				</View>
			</TouchableOpacity>
			{item.data && item.checked && <View style={styles.items}>{item.data.map(renderItem)}</View>}
		</>
	)
}

const styles = StyleSheet.create({
	block: {
		paddingVertical: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	borderBlock: {
		borderTopWidth: 1,
		borderTopColor: 'rgba(112, 112, 112, 0.3)',
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
	checkBox: {
		width: 20,
		height: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ADB2B9',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activated: {
		backgroundColor: '#0B9D32',
		borderColor: '#0A7C29',
	},
	mark: {
		width: 10,
		height: 8,
	},
	container: {
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	items: {
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: 'rgba(112, 112, 112, 0.3)',
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ADB2B9',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circleActive: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#0B9D32',
		justifyContent: 'center',
		alignItems: 'center',
	},
	point: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#0B9D32',
	},
})
