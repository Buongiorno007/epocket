import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'

export default function Panel({ item }) {
	const [expanded, setExpanded] = useState(false)
	const [animation] = useState(new Animated.Value(73))
	const [maxHeight, setMaxHeight] = useState(0)

	const toggle = () => {
		const finalValue = expanded ? 73 : maxHeight + 73
		setExpanded(!expanded)
		Animated.timing(animation, {
			toValue: finalValue,
			duration: 500,
		}).start()
	}

	const renderItem = (item) => (
		<View style={styles.eachItem} key={item.id}>
			<Image style={{ width: '100%', height: 50 }} source={{ uri: item.image }} />
			<Text>{item.title}</Text>
			<Text>{item.price}</Text>
		</View>
	)

	const getMaxHeight = (event) => {
		setMaxHeight(event.nativeEvent.layout.height)
	}
	return (
		<Animated.View style={[styles.container, { height: animation }]}>
			<TouchableOpacity style={styles.button} onPress={toggle}>
				<Image style={styles.image} source={{ uri: item.img }} />
				<Text style={styles.title}>{item.title}</Text>
				<Text>{`(${item.count})`}</Text>
				<View style={styles.endArrow}></View>
			</TouchableOpacity>
			<View style={styles.body} onLayout={getMaxHeight}>
				{item.data.map(renderItem)}
			</View>
		</Animated.View>
	)
}

var styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(112, 112, 112, 0.3)',
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
	},
	endArrow: {
		flexGrow: 1,
	},
	title: {
		color: '#2a2f43',
		fontSize: 18,
		height: 18,
	},
	button: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 16,
		backgroundColor: 'lightblue',
		alignItems: 'center',
	},
	body: {
		paddingBottom: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	eachItem: {
		width: '45%',
		marginTop: 16,
	},
})
