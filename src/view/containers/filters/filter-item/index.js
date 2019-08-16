import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { changeMark } from '@reducers/mapPoints'
import { connect } from 'react-redux'

function FilterItem({ item, index, mapPoints, dispatch }) {
	return (
		<TouchableOpacity
			onPress={() => dispatch(changeMark(item.id))}
			style={[styles.block, index && styles.borderBlock]}
		>
			<Image source={{ uri: item.image }} style={styles.image} />
			<Text style={styles.text}>{item.name}</Text>
			<View style={[styles.checkBox, item.checked && styles.activated]}>
				<Image style={styles.mark} source={require('@assets/img/mark.png')} />
			</View>
		</TouchableOpacity>
	)
}
const mapStateToProps = (state) => {
	return {
		mapPoints: state.mapPoints,
	}
}

export default connect(mapStateToProps)(FilterItem)

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
		backgroundColor: '#F63272',
		borderColor: '#D02059',
	},
	mark: {
		width: 10,
		height: 8,
	},
})
