import React from 'react'
import FastImage from 'react-native-fast-image'
import { View } from 'react-native'
import { RNCamera } from 'react-native-camera'
//containers
import CustomAlert from '../../containers/custom-alert/custom-alert'
//constants
import styles from './styles'
import { ICONS } from './../../../constants/icons'
import { urls } from '../../../constants/urls'
//redux
import { loaderState } from '../../../reducers/loader'
import { setShowQR } from '../../../reducers/set-show-qr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//services
import NavigationService from '../../../services/route'
import { httpPost } from '../../../services/http'
import { handleError } from '../../../services/http-error-handler'
import I18n from '@locales/I18n'

class ScannerCamera extends React.Component {
	state = {
		errorVisible: false,
		qr_code: null,
		errorText: '',
	}

	setModalVisible = (visible) => {
		this.setState({ errorVisible: visible })
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.props.loaderState(false)
		}, 2000)
	}

	sendQRCode = (qrcode) => {
		if (qrcode.data) {
			this.props.loaderState(true)
			this.props.setShowQR(false)
			let body = {
				mission_id: this.props.selectedMission.id,
				qrCode: qrcode.data,
			}
			httpPost(urls.send_qr_code, JSON.stringify(body), this.props.token).then(
				(result) => {
					this.props.setShowQR(true)
					NavigationService.navigate('Photograph')
				},
				(error) => {
					this.props.loaderState(false)
					this.props.setShowQR(true)
					let error_respons = handleError(
						error,
						body,
						urls.send_qr_code,
						this.props.token,
						this.constructor.name,
						'sendQRCode',
					)
					this.setState({ errorText: error_respons.error_text })
					this.setModalVisible(error_respons.error_modal)
				},
			)
		}
	}
	reopenQRScanner = () => {
		this.props.setShowQR(true)
		this.setModalVisible(!this.state.errorVisible)
	}

	render = () => {
		return (
			<View style={styles.container}>
				<CustomAlert
					title={this.state.errorText}
					first_btn_title={I18n.t('REPEAT')}
					visible={this.state.errorVisible}
					first_btn_handler={() => this.reopenQRScanner()}
					decline_btn_handler={() => this.reopenQRScanner()}
				/>
				<View style={styles.frame}>
					<RNCamera
						captureAudio={false}
						ratio={'1:1'}
						ref={(ref) => (this.camera = ref)}
						style={styles.camera}
						onBarCodeRead={(e) => {
							if (this.props.showQR) this.sendQRCode(e)
						}}
						barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
						permissionDialogTitle={I18n.t('TITLE')}
						permissionDialogMessage={I18n.t('CAMERA_PERMISSION')}
					/>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						source={{ uri: ICONS.SCANNER.FRAME }}
						style={styles.image}
					/>
				</View>
				<View style={styles.scanner}>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						source={{ uri: ICONS.SCANNER.CODE }}
						style={styles.icon}
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	selectedMission: state.selectedMission,
	token: state.token,
	userColor: state.userColor,
	loader: state.loader,
	showQR: state.showQR,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ loaderState, setShowQR }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ScannerCamera)
