import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setShowQR } from '@reducers/set-show-qr'
import { sendCode } from '@reducers/scanner'
import { RNCamera } from 'react-native-camera'
import { ICONS } from '@constants/icons'
import FastImage from 'react-native-fast-image'
import Alert from '@containers/custom/custom-alert/custom-alert'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	id: number,
	token: string,
	show: boolean,
	scanner: any,
	setShowQR: (visible: boolean) => void,
	sendCode: (id: Number, code: String) => void,
}

type State = typeof initialState

const initialState = {
	visible: false,
	code: null,
	error: '',
}

class Camera extends React.Component<Props, State> {
	camera = null

	state = initialState

	componentDidUpdate(prevProps) {
		if (prevProps.scanner.code !== this.props.scanner.code && this.props.scanner.code) {
			if (this.props.scanner.code !== 1) {
				const { message } = this.props.scanner
				this.setState({ error: message })
				this.setAlert(true)
			}
		}
	}

	setAlert = (visible) => {
		this.setState({ visible })
	}

	setRef = (ref) => {
		this.camera = ref
	}

	send = (code) => {
		const { show, id } = this.props
		const { data } = code
		if (show) {
			this.props.sendCode(id, data)
		}
	}

	reOpen = () => {
		const { visible } = this.state
		this.props.setShowQR(true)
		this.setAlert(!visible)
	}

	render() {
		const frame = { uri: ICONS.SCANNER.FRAME }
		const code = { uri: ICONS.SCANNER.CODE }
		const { visible, error } = this.state
		return (
			<View style={styles.layout}>
				<Alert
					title={error}
					visible={visible}
					first_btn_title={I18n.t('REPEAT')}
					first_btn_handler={this.reOpen}
					decline_btn_handler={this.reOpen}
				/>
				<View style={styles.frame}>
					<RNCamera
						captureAudio={false}
						// ratio={'1:1'}
						style={styles.camera}
						onBarCodeRead={!visible && this.send}
						// onBarCodeRead={() => console.log('LOG')}
						barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
						// onGoogleVisionBarcodesDetected={() => console.log('LOG')}
						// googleVisionBarcodeType={
						// 	RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.DATA_MATRIX
						// }
						androidCameraPermissionOptions={{
							title: I18n.t('TITLE'),
							message: I18n.t('CAMERA_PERMISSION'),
							buttonPositive: I18n.t('OK'),
							buttonNegative: I18n.t('CANCEL'),
						}}
					/>
					<FastImage resizeMode={FastImage.resizeMode.contain} source={frame} style={styles.image} />
				</View>
				<View style={styles.scanner}>
					<FastImage resizeMode={FastImage.resizeMode.contain} source={code} style={styles.icon} />
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.selectedMission.id,
	token: state.token,
	show: state.showQR,
	scanner: state.scanner,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setShowQR,
			sendCode,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Camera)
