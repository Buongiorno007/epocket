import React from 'react'
import { View, Text, Platform, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
import CookieManager from 'react-native-cookies'
import Blur from '../../../containers/blur/blur'
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setInstaToken } from '../../../../reducers/insta-token'
import { setFacebookToken } from '../../../../reducers/facebook-token'
import { loaderState } from '../../../../reducers/loader'
import { setTabState } from '../../../../reducers/tabs'
//constants
import styles from './styles'
import { ICONS } from '@constants/icons'
import { urls } from '@constants/urls'
import { colors } from '../../../../constants/colors'
//containers
import CustomButton from '@containers/custom/custom-button/custom-button'
import CustomAlert from '@containers/custom/custom-alert/custom-alert'
//service
import NavigationService from '../../../../services/route'
import InstagramLogin from '../../../../services/Instagram'
import FacebookLogin from '../../../../services/Facebook'
import { httpPost } from '../../../../services/http'
import I18n from '@locales/I18n'

class ProfileSettings extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		modalVisible: false,
		errorVisible: false,
		userCount: 0,
	}
	componentDidMount() {
		this.props.loaderState(false)
	}
	LogOut = () => {
		AsyncStorage.setItem('token', '')
		NavigationService.navigate('Start')
		CookieManager.clearAll()
		this.props.setTabState(0)
	}
	LoginFacebook = (token) => {
		this.props.loaderState(true)
		let body = JSON.stringify({
			access_token: token,
		})
		httpPost(urls.facebook_login, body, this.props.token).then(
			(result) => {
				if (result.body.url) {
					this.refs.facebookLogin.show(result.body.url)
				} else if (result.status === 201) {
					CookieManager.clearAll().then((res) => {
						this.setModalVisible(true)
						this.setState({ userCount: result.body.subsc_needed })
						this.props.loaderState(false)
						LoginManager.logOut()
					})
				}
				this.props.loaderState(false)
			},
			(error) => {
				CookieManager.clearAll().then((res) => {
					this.props.loaderState(false)
					LoginManager.logOut()
				})
			},
		)
	}

	disConnectFacebook = () => {
		this.props.loaderState(true)
		this.props.setFacebookToken('')
		let body = JSON.stringify({})
		httpPost(urls.facebook_logout, body, this.props.token).then(
			(result) => {
				this.props.loaderState(false)
				CookieManager.clearAll().then((res) => {
					this.props.loaderState(false)
				})
			},
			(error) => {
				this.props.loaderState(false)
				CookieManager.clearAll().then((res) => {
					this.props.loaderState(false)
				})
			},
		)
	}
	disConnectInsta = () => {
		this.props.loaderState(true)
		this.props.setInstaToken('')
		let body = JSON.stringify({
			instagram_token: this.props.insta_token,
		})
		httpPost(urls.insta_logout, body, this.props.token).then(
			(result) => {
				this.props.loaderState(false)
				CookieManager.clearAll()
			},
			(error) => {
				this.props.loaderState(false)
				CookieManager.clearAll()
			},
		)
	}
	connectFacebook = (token) => {
		this.props.setFacebookToken(String(token))
	}
	connectInsta = (instagram_token) => {
		this.props.loaderState(true)
		let body = JSON.stringify({
			instagram_token,
		})
		httpPost(urls.insta_login, body, this.props.token).then(
			(result) => {
				if (result.status === 202 || result.status === 200) {
					this.props.setInstaToken(String(instagram_token))
					this.props.loaderState(false)
				} else if (result.status === 201) {
					CookieManager.clearAll().then((res) => {
						this.setModalVisible(true)
						this.setState({ userCount: result.body.subsc_needed })
						this.props.loaderState(false)
					})
				} else {
					CookieManager.clearAll().then((res) => {
						this.setErrorVisible(true)
						this.props.loaderState(false)
					})
				}
			},
			(error) => {
				CookieManager.clearAll().then((res) => {
					this.props.loaderState(false)
				})
			},
		)
	}
	setErrorVisible = (visible) => {
		this.setState({
			errorVisible: visible,
		})
	}
	setModalVisible = (visible) => {
		this.setState({
			modalVisible: visible,
		})
	}

	openSupport = () => {
		Linking.canOpenURL('tg://')
			.then((supported) => {
				if (!supported) {
					if (Platform.OS === 'ios') {
						Linking.openURL('itms-apps://itunes.apple.com/app/telegram-messenger/id686449807?mt=8')
					} else {
						Linking.openURL('market://details?id=org.telegram.messenger')
					}
				} else {
					Linking.openURL('https://t.me/epc_admin')
				}
			})
			.catch((err) => console.log(err))
	}

	render() {
		return (
			<View style={styles.main_view}>
				<FacebookLogin
					ref='facebookLogin'
					scopes={['basic']}
					onLoginSuccess={(json) => this.connectFacebook(json.token)}
					onLoginFailure={(data) => {
						CookieManager.clearAll().then((res) => {
							this.props.loaderState(false)
						})
						if (data.msg === 'Not enough friends') {
							if (data.subsc_needed) {
								this.setState({ userCount: data.subsc_needed })
								this.setModalVisible(true)
							}
						} else {
							this.setErrorVisible(true)
						}
					}}
				/>
				<InstagramLogin
					ref='instagramLogin'
					clientId='7df789fc907d4ffbbad30b7e25ba3933'
					redirectUrl='https://epocket.dev.splinestudio.com'
					scopes={['basic']}
					onLoginSuccess={(token) => this.connectInsta(token)}
					onLoginFailure={(data) => {
						this.connectInsta(data.next.split('/#access_token=')[1])
						CookieManager.clearAll().then((res) => {
							this.props.loaderState(false)
						})
					}}
				/>
				{/* {this.state.animationState ? <Blur dark /> : null}
				{this.state.animationState ? (
					<FastImage
						style={styles.animation}
						resizeMode={FastImage.resizeMode.contain}
						source={require('../../../assets/img/smile.gif')}
					/>
				) : null}
				{this.state.animationState ? (
					<View style={styles.white_text_container}>
						<Text style={styles.white_text}>{I18n.t('CONNECT_SOCIAL')}</Text>
					</View>
				) : null} */}
				<View style={[styles.image_block_button, styles.top_insta]}>
					<CustomButton
						active
						short
						extra_short
						gradient
						title={
							this.props.insta_token ? I18n.t('PROFILE_SETTINGS.REMOVE') : I18n.t('PROFILE_SETTINGS.ADD')
						}
						color={this.props.userColor.white}
						handler={() => {
							!this.props.insta_token ? this.refs.instagramLogin.show() : this.disConnectInsta()
						}}
					/>
				</View>
				{/* <View style={[styles.image_block_button, styles.top_facebook]}>
					<View>
						<LoginButton
							onLoginFinished={(error, result) => {
								if (error) {
								} else if (result.isCancelled) {
								} else {
									AccessToken.getCurrentAccessToken().then((data) => {
										this.LoginFacebook(data.accessToken.toString())
									})
								}
							}}
							onLogoutFinished={() => this.disConnectFacebook()}
						/>
					</View>
				</View> */}
				<View style={styles.header}>
					<Text style={[styles.header_text, styles.image_block_text_big]}>
						{I18n.t('PROFILE_SETTINGS.SETTINGS')}
					</Text>
					<Button
						transparent
						rounded
						style={styles.settings_btn}
						onPress={() => {
							NavigationService.navigate('Main')
						}}
					>
						<FastImage
							style={styles.close_img}
							resizeMode={FastImage.resizeMode.contain}
							source={{ uri: ICONS.COMMON.CLOSE }}
						/>
					</Button>
				</View>

				<View style={styles.info}>
					<View style={[styles.image_block_with_button, styles.image_block_with_border]}>
						<Button
							transparent
							style={styles.button}
							onPress={() => {
								NavigationService.navigate('ProfEdit')
							}}
						>
							<FastImage
								style={styles.settings_img}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/writing.png')}
							/>
							<View style={styles.image_block_text_button}>
								<Text style={styles.image_block_text_big}>
									{I18n.t('PROFILE_SETTINGS.EDIT_PROFILE')}
								</Text>
							</View>
						</Button>
					</View>

					<View style={[styles.image_block]}>
						<FastImage
							style={styles.settings_img}
							resizeMode={FastImage.resizeMode.contain}
							source={require('@assets/img/instagram-logo.png')}
						/>
						<View style={styles.image_block_text}>
							<Text style={styles.image_block_text_big}>{I18n.t('PROFILE_SETTINGS.INSTAGRAM')}</Text>
							<Text style={styles.image_block_text_small}>
								{I18n.t('PROFILE_SETTINGS.INSTAGRAM_ADDITIONAL')}
							</Text>
						</View>
					</View>
					{/* <View style={[styles.image_block, styles.image_block_with_border]}>
						<FastImage style={styles.settings_img} source={require('../../../assets/img/facebook.png')} />
						<View style={styles.image_block_text}>
							<Text style={styles.image_block_text_big} />
						</View>
					</View> */}
					<View style={[styles.image_block_with_button, styles.image_block_with_top_border]}>
						<Button
							transparent
							style={styles.button}
							onPress={() => {
								this.openSupport()
							}}
						>
							<FastImage
								style={styles.settings_img}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/telegram.png')}
							/>
							<View style={styles.image_block_text_button}>
								<Text style={[styles.image_block_text_big, {textTransform: 'uppercase'}]}>{I18n.t('PROFILE_SETTINGS.SUPPORT')}</Text>
							</View>
						</Button>
					</View>
					<View style={[styles.image_block_with_button, styles.image_block_with_top_border]}>
						<Button
							transparent
							style={styles.button}
							onPress={() => {
								this.LogOut()
							}}
						>
							<FastImage
								style={styles.settings_img}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/logout.png')}
							/>
							<View style={styles.image_block_text_button}>
								<Text style={styles.image_block_text_big}>{I18n.t('PROFILE_SETTINGS.EXIT')}</Text>
							</View>
						</Button>
					</View>
				</View>
				<CustomAlert
					title={I18n.t('PROFILE_PAGE.ALREADY_ACCOUNT')}
					first_btn_title={I18n.t('OK')}
					visible={this.state.errorVisible}
					first_btn_handler={() => this.setErrorVisible(!this.state.errorVisible)}
					decline_btn_handler={() => this.setErrorVisible(!this.state.errorVisible)}
				/>
				<CustomAlert
					title={I18n.t('PROFILE_PAGE.NOT_ENOUGHT_SUB')}
					subtitle={this.state.userCount + I18n.t('PROFILE_PAGE.SUBS')}
					first_btn_title={I18n.t('OK')}
					visible={this.state.modalVisible}
					first_btn_handler={() => this.setModalVisible(!this.state.modalVisible)}
					decline_btn_handler={() => this.setModalVisible(!this.state.modalVisible)}
				/>
			</View>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.profileState,
		userColor: state.userColor,
		token: state.token,
		insta_token: state.insta_token,
		facebook_token: state.facebook_token,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			setInstaToken,
			setFacebookToken,
			setTabState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProfileSettings)
