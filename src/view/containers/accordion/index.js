import React, { useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import animation from '@constants/layout'
import { connect } from 'react-redux'
import styles from './styles'

function Accordion({ item, pressProduct, profileState }) {
	const [expanded, setExpanded] = useState(false)

	const handleDisplay = () => {
		animation()
		setExpanded(!expanded)
	}

	const renderItem = (item) => (
		<TouchableOpacity style={styles.eachItem} key={item.id} onPress={() => pressProduct(item)}>
			<Image style={styles.img} source={{ uri: item.image }} />
			<Text style={styles.cardTitle}>{item.title}</Text>
			<Text style={styles.cardSubtitle}>{`${item.price} ${profileState.currency}`}</Text>
		</TouchableOpacity>
	)

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleDisplay}>
				<Image style={styles.image} source={{ uri: item.img }} />
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{` (${item.count})`}</Text>
				<View style={[styles.endArrow, expanded && styles.opened]}></View>
			</TouchableOpacity>
			{expanded && <View style={styles.body}>{item.data.map(renderItem)}</View>}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(Accordion)
