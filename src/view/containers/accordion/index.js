import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import animation from '@constants/layout'
import styles from './styles'

export default function Accordion({ item, pressProduct }) {
	const [expanded, setExpanded] = useState(false)

	const handleDisplay = () => {
		animation()
		setExpanded(!expanded)
	}

	const renderItem = (item) => (
		<TouchableOpacity style={styles.eachItem} key={item.id} onPress={() => pressProduct(item)}>
			<Image style={styles.img} source={{ uri: item.image }} />
			<Text>{item.title}</Text>
			<Text>{item.price}</Text>
		</TouchableOpacity>
	)

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleDisplay}>
				<Image style={styles.image} source={{ uri: item.img }} />
				<Text style={styles.title}>{item.title}</Text>
				<Text>{`(${item.count})`}</Text>
				<View style={styles.endArrow}></View>
			</TouchableOpacity>
			{expanded && <View style={styles.body}>{item.data.map(renderItem)}</View>}
		</View>
	)
}
