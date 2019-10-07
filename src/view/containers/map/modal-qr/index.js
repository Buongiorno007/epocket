import React from 'react'
import { StyleSheet, View, Modal, Dimensions, Text, TouchableOpacity, Image } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { connect } from 'react-redux'
import I18n from "@locales/I18n"

const { width, height } = Dimensions.get('window')

function ModalQr({ profileState, visible, qrvalue, price, hide }) {
	return (
		<Modal animationType={'fade'} visible={visible} transparent>
			<View style={styles.container}>
				<TouchableOpacity style={styles.close} onPress={hide}>
					<Image style={styles.img} source={require('@assets/img/clos.png')} />
				</TouchableOpacity>
				<Text style={styles.title}>{I18n.t('QRCODE.SHOW')}</Text>
				<Text style={styles.price}>{`${price} ${profileState.currency}`}</Text>
				<View style={styles.qrField}>
					<QRCode value={qrvalue} size={width - 80} />
				</View>
			</View>
		</Modal>
	)
}

const mapStateToProps = (state) => ({
	profileState: state.profileState,
})

export default connect(mapStateToProps)(ModalQr)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width,
		height,
		paddingHorizontal: 16,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.90)',
	},
	qrField: {
		width: width - 32,
		height: width - 32,
		padding: 24,
		backgroundColor: '#fff',
	},
	close: {
		width: 40,
		height: 40,
		position: 'absolute',
		right: 16,
		top: 32,
	},
	img: {
		width: 40,
		height: 40,
	},
	title: {
		fontFamily: 'Rubik-Medium',
		textAlign: 'center',
		fontSize: 18,
		color: '#404140',
		marginBottom: 8,
	},
	price: {
		fontFamily: 'Rubik-Light',
		fontSize: 24,
		color: '#F63272',
		marginBottom: 16,
	},
})
