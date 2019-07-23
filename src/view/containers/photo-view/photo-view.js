import React from 'react'
import { View, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button, Text } from 'native-base'
import NavigationService from './../../../services/route'
//containers
import CustomAlert from '../../containers/custom-alert/custom-alert'
import TemplateInstagramPhoto from '../template-insta-photo/template-insta-photo'
import InstaHashTags from '../insta-hashtags/insta-hashtags'
//constants
import styles from './styles'
import { urls } from '../../../constants/urls'
//redux
import { loaderState } from '../../../reducers/loader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setBalance } from '../../../reducers/user-balance'
//services
import { httpPost } from '../../../services/http'
import { serializeJSON } from '../../../services/serialize-json'
import { handleError } from '../../../services/http-error-handler'
import I18n from '@locales/I18n'

class PhotoView extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		errorPhotoVisible: false,
		errorMissionVisible: false,
		errorText: '',
	}
	setErrorPhotoVisible = (visible) => {
		this.setState({ errorPhotoVisible: visible })
	}
	setErrorMissionVisible = (visible) => {
		this.setState({ errorMissionVisible: visible })
	}
	componentDidMount() {
		this.props.loaderState(false)
	}
	sendPhoto = () => {
		this.setErrorPhotoVisible(false)
		this.props.loaderState(true)
		let body = {
			outlet_id: this.props.selectedMall.id,
			photo: this.props.navigation.state.params.image,
			mission_id: this.props.selectedMission.id,
			device: Platform.OS === 'android',
		}
		httpPost(urls.insta_upload_photo, serializeJSON(body), this.props.token, true).then(
			(result) => {
				this.setErrorPhotoVisible(false)
				// if (__DEV__) {
				NavigationService.navigate('MissionSuccess', {
					price: this.props.selectedMission.price,
					insta_data: result.body,
					img: this.props.navigation.state.params.url,
				})
				// } else {
				// 	this.finishMission(result.body)
				// }
			},
			(error) => {
				let error_respons = handleError(
					error,
					body,
					urls.insta_upload_photo,
					this.props.token,
					this.constructor.name,
					'sendPhoto',
				)
				this.setState({ errorText: error_respons.error_text })
				this.setErrorPhotoVisible(error_respons.error_modal)
				this.props.loaderState(false)
			},
		)
	}

	finishMission(insta_data) {
		this.setErrorMissionVisible(false)
		let body = {
			outlet_id: this.props.selectedMall.id,
			mission_id: this.props.selectedMission.id,
		}
		httpPost(urls.finish_mission, JSON.stringify(body), this.props.token).then(
			(result) => {
				this.setErrorMissionVisible(false)
				this.props.setBalance(result.body.balance)
				// NavigationService.navigate("MissionSuccess", {
				//   price: this.props.selectedMission.price
				// });
				NavigationService.navigate('MissionSuccess', {
					price: this.props.selectedMission.price,
					insta_data: insta_data,
				})
			},
			(error) => {
				let error_respons = handleError(
					error,
					body,
					urls.finish_mission,
					this.props.token,
					this.constructor.name,
					'finishMission',
				)
				this.setState({ errorText: error_respons.error_text })
				this.setErrorMissionVisible(error_respons.error_modal)
				this.props.loaderState(false)
			},
		)
	}

	render = () => {
		return (
			<View style={styles.container}>
				<CustomAlert
					title={this.state.errorText}
					first_btn_title={I18n.t('REPEAT')}
					visible={this.state.errorPhotoVisible}
					first_btn_handler={() => {
						this.sendPhoto()
					}}
					decline_btn_handler={() => {
						this.setErrorPhotoVisible(!this.state.errorPhotoVisible)
					}}
				/>
				<CustomAlert
					title={this.state.errorText}
					first_btn_title={I18n.t('REPEAT')}
					visible={this.state.errorMissionVisible}
					first_btn_handler={() => {
						this.finishMission()
					}}
					decline_btn_handler={() => {
						this.setErrorMissionVisible(!this.state.errorMissionVisible)
					}}
				/>
				<View style={styles.template_photo}>
					<TemplateInstagramPhoto template_url={this.props.navigation.state.params.template_info.media} />
				</View>
				<View style={[styles.block, styles.size]}>
					<FastImage source={{ uri: this.props.navigation.state.params.url }} style={styles.image} />
				</View>

				{/* <View style={styles.template_hashtags}>
					<InstaHashTags hashtags={this.props.navigation.state.params.template_info.hashtags} />
				</View> */}
				<Text>{this.props.navigation.state.params.template_info.hashtags}</Text>
				<View style={[styles.navigation, styles.size]}>
					<View style={[styles.button_container, styles.size]}>
						<Button
							rounded
							transparent
							block
							style={[styles.button, styles.remove]}
							onPress={() => NavigationService.navigate('Photograph')}
							androidRippleColor={this.props.userColor.card_shadow}
						>
							<Text uppercase={false} style={[styles.button_text, styles.remove_text]}>
								{I18n.t('SCANNER.REMOVE')}
							</Text>
						</Button>
						<Button
							rounded
							transparent
							block
							style={[styles.button, styles.send]}
							androidRippleColor={this.props.userColor.card_shadow}
							onPress={() => this.sendPhoto()}
						>
							<Text uppercase={false} style={[styles.button_text, styles.send_text]}>
								{I18n.t('SCANNER.SEND')}
							</Text>
						</Button>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	selectedMission: state.selectedMission,
	selectedMall: state.selectedMall,
	userColor: state.userColor,
	token: state.token,
	loader: state.loader,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setBalance,
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PhotoView)
