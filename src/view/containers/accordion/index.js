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

	const renderItem = (item) => {
		return (
			<TouchableOpacity
				style={styles.eachItem}
				disabled={!item.in_stock}
				key={item.product_unique_id}
				onPress={() => pressProduct(item)}
			>
				<Image style={styles.img} source={{ uri: item.photo }} />
				<Text style={styles.cardTitle}>{item.name}</Text>
				<Text style={styles.cardSubtitle}>{`${item.price} ${profileState.currency}`}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleDisplay}>
				<Image style={styles.image} source={{ uri: item.cat_image }} />
				<Text style={styles.title}>{item.cat_title}</Text>
				<Text style={styles.subtitle}>{` (${item.prod_count})`}</Text>
				<View style={[styles.endArrow, expanded && styles.opened]}></View>
			</TouchableOpacity>
			{expanded && <View style={styles.body}>{item.cat_products.map(renderItem)}</View>}
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(Accordion)
