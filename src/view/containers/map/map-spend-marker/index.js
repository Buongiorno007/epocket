import React from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import { getStorePoint } from '@reducers/storePoint'
import { colors } from '@constants/colors'

function MapSpendMarker({ data, dispatch, storePoint, triggerInfoSp }) {
	const getProducts = () => {
		if (data.partners) {
		} else {
			dispatch(getStorePoint(data.id))
		}
	}

	return (
		<View>
			<Marker coordinate={data.location} style={{ zIndex: 1, width: 74, height: 74 }} onPress={getProducts}>
				<View style={styles.container}>
					{Platform.OS === 'ios' ? (
						<View style={[styles.imageBorder]}>
							<Image style={styles.img} source={{ uri: data.photo }} />
						</View>
					) : (
						<View style={data.id === storePoint.id && triggerInfoSp ? [styles.imageBorder, styles.imageBorderBig] : styles.imageBorder}>
							<Image
								style={data.id === storePoint.id && triggerInfoSp ? [styles.img, styles.imgBig] : styles.img}
								source={{ uri: data.photo }}
							/>
						</View>
					)}
				</View>
			</Marker>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		storePoint: state.storePoint,
		triggerInfoSp: state.triggerInfoSp,
	}
}

export default connect(mapStateToProps)(MapSpendMarker)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	imageBorder: {
		borderWidth: 2,
		borderColor: colors.blood_red,
		borderRadius: 24,
		width: 48,
		height: 48,
		backgroundColor: colors.transparent,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	img: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	imageBorderBig: {
		borderRadius: 36,
		width: 72,
		height: 72,
	},
	imgBig: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
})
