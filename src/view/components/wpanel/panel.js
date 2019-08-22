import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'

export default function Panel({ children, title }) {
	const [expanded, setExpanded] = useState(false)
	const [animation] = useState(new Animated.Value(50))
	const [maxHeight, setMaxHeight] = useState(0)
	const [minHeight, setMinHeight] = useState(0)

	const toggle = () => {
		const finalValue = expanded ? 50 : maxHeight + 50

		setExpanded(!expanded)

		Animated.timing(animation, {
			toValue: finalValue,
			duration: 500,
		}).start()
	}

	const getMinHeight = (event) => {
		setMinHeight(event.nativeEvent.layout.height)
	}
	const getMaxHeight = (event) => {
		setMaxHeight(event.nativeEvent.layout.height)
	}


	return (
		<Animated.View style={[styles.container, { height: animation }]}>
			<View onLayout={getMinHeight}>
				<TouchableOpacity style={styles.button} onPress={toggle}>
					<Text style={styles.title}>{title}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.body} onLayout={getMaxHeight}>
				{children}
			</View>
		</Animated.View>
	)
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'pink',
		margin: 10,
		overflow: 'hidden',
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
		paddingHorizontal: 16,
		paddingVertical: 16,
		backgroundColor: 'lightblue',
	},
	body: {
		padding: 10,
		paddingTop: 0,
	},
})
