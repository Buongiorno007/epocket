import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native'
import { colors } from '@constants/colors'
import { saveOrder } from '@reducers/order'
import { connect } from 'react-redux'
const { width } = Dimensions.get('window')

function BasketItem({ item, dispatch }) {
	const [gradwidth, setGradwidth] = useState(0)

	const goToOrderScreen = () => dispatch(saveOrder(item))

	return (
		<TouchableHighlight style={styles.container} onPress={goToOrderScreen} underlayColor={'#d8e3f2'}>
			<>
			<Image style={styles.image} source={{ uri: item.point_image }} />
			<Text style={[styles.title, {width: width - gradwidth - 88}]}>{item.point_name}</Text>
			<View style={styles.grad} onLayout={event => {
				const { width } = event.nativeEvent.layout
				setGradwidth(width)
				}}>
				<Text style={styles.gradText}>{item.point_basket_amount}</Text>
				<View style={styles.arrow}></View>
			</View>
			</>
		</TouchableHighlight>
	)
}
export default connect()(BasketItem)

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		borderBottomColor: 'rgba(112,112,112,0.3)',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#E5EDF7',
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16,
	},
	title: {
		fontFamily: 'Rubik-Light',
		fontSize: 18,
		color: '#404140',
		flexGrow: 1,
	},
	grad: {
		height: 24,
		borderRadius: 16,
		paddingHorizontal: 8,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.blood_red,
	},
	gradText: {
		fontFamily: 'Rubik-Regular',
		fontSize: 12,
		color: '#fff',
		marginRight: 8,
	},
	arrow: {
		width: 8,
		height: 8,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderColor: '#fff',
		transform: [{ rotate: '45deg' }],
	},
})
