import React from 'react'
import { View, Text, Linking, Image, Platform, TouchableOpacity, ScrollView, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
//constants
import styles from './styles'
import { urls } from '@constants/urls'
//containers
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import CustomPhoto from '@containers/custom/custom-photo/custom-photo'
import RefLink from '@containers/ref-link/ref-link'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loaderState } from '@reducers/loader'
//service
import NavigationService from '@services/route'
import { httpPost } from '@services/http'
import I18n from '@locales/I18n'
import { sendToTelegramm } from '@services/telegramm-notification'
import route from '@services/route'
import { shareToOneSocial } from '@services/share-ref-link'
import { colors } from '@constants/colors'

class NewProfile extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		user: {
			username: this.props.user.user_name,
			photo: this.props.user.user_photo_url,
			phone: this.props.user.user_phone,
		},
		toogle: false,
		refferal_link: urls.blank,
		refferal_price: 0,
		modalVisible: false,
		age: '',
		gender: 1,
		validate: false,
	}
	componentDidMount() {
		// this.props.loaderState(true)
		const { profileState } = this.props
		this.setState({
			user: {
				username: profileState.name,
				phone: profileState.phone,
				photo: profileState.photo,
				sex: profileState.sex,
				birthDay: profileState.birthDay,
				currency: profileState.currency,
			},
		})
		// httpPost(urls.get_referral_link, JSON.stringify({}), this.props.token).then(
		// 	(result) => {
		// 		console.log('link.result', result)
		// 		this.setState({
		// 			refferal_link: result.body.new_link ? result.body.new_link : urls.ref_link + result.body.link,
		// 			refferal_price: Number(Number(result.body.ref_reward).toFixed(2)),
		// 		})
		// 		this.props.loaderState(false)
		// 	},
		// 	(error) => {
		// 		this.props.loaderState(false)
		// 	},
		// )
	}

	// componentDidUpdate = (prevProps, prevState) => {
	// 	if (prevState.toogle !== this.state.toogle && !this.state.toogle) {
	// 		httpPost(urls.get_referral_link, JSON.stringify({}), this.props.token).then(
	// 			(result) => {
	// 				this.setState({
	// 					refferal_link: result.body.new_link ? result.body.new_link : urls.ref_link + result.body.link,
	// 					refferal_price: Number(Number(result.body.ref_reward).toFixed(2)),
	// 				})
	// 				this.props.loaderState(false)
	// 			},
	// 			(error) => {
	// 				sendToTelegramm(error, get_referral_link, 'ERROR')
	// 				this.props.loaderState(false)
	// 			},
	// 		)
	// 	}
	// }

	setToogle = (value) => this.setState({ toogle: value })

	ToEdit = () => {
		this.props.loaderState(true)
		NavigationService.navigate('ProfEdit')
	}
	ToSettings = () => {
		NavigationService.navigate('ProfileSettings')
	}
	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible })
	}
	ExitProfile = () => {
		this.setModalVisible(true)
	}
	connectInsta = () => {
		this.refs.instagramLogin.show()
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
				<ScrollView>
					<View style={styles.header}>
						<Button
							transparent
							rounded
							style={styles.settings_btn}
							onPress={() => {
								this.ToSettings()
							}}
						>
							<FastImage
								style={styles.settings_img}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/settings.png')}
							/>
						</Button>
					</View>
					<View style={styles.info}>
						<View style={styles.photo_container}>
							<CustomPhoto src={this.state.user.photo} />
						</View>

						<View style={styles.userData}>
							<Text style={styles.name}>{this.state.user.username}</Text>
							<Text style={styles.age}>{`${this.state.user.birthDay} ${I18n.t('PROFILE_SETTINGS.AGE')}`}</Text>
						</View>

						<TouchableOpacity
							style={styles.bigBtn}
							onPress={() => {
								this.openSupport()
							}}
						>
							<FastImage
								style={[styles.bigBtnImg]}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/telegram.png')}
							/>
							<Text style={[styles.bigBtnText]}>{I18n.t('PROFILE_SETTINGS.SUPPORT')}</Text>
							<FastImage
								style={[styles.bigBtnImg2]}
								resizeMode={FastImage.resizeMode.contain}
								source={require('@assets/img/arrow-white-right.png')}
							/>
						</TouchableOpacity>

						<View style={styles.refContainer}>
							<TouchableOpacity style={styles.refPad} onPress={() => route.push('AddFriend')}>
								<View style={styles.refPad_row}>
									<Image style={styles.refPadImg_big} source={require('@assets/img/add-friend.png')} resizeMode={'contain'} />
									<Text style={styles.refPadText_red}>{`+ 5 ${this.props.profileState.currency}`}</Text>
								</View>
								<View style={styles.refPad_row}>
									<Text style={styles.refPadText_bl}>{I18n.t('REF_LINK.ADD_FRIEND2')}</Text>
									<Image style={styles.refPadImg_sm} source={require('@assets/img/small_arrow_right.png')} resizeMode={'contain'} />
								</View>
							</TouchableOpacity>

							{/* <TouchableOpacity style={[styles.refPad]} onPress={() => route.push('AddAdvert')}>
								<View style={styles.refPad_row}>
									<Image style={styles.refPadImg_big} source={require('@assets/img/add-advert.png')} resizeMode={'contain'} />
									<Text style={styles.refPadText_red}>{'+ 50 $'}</Text>
								</View>
								<View style={styles.refPad_row}>
									<Text style={styles.refPadText_bl}>{I18n.t('REF_LINK.ADD_ADVERT')}</Text>
									<Image style={styles.refPadImg_sm} source={require('@assets/img/small_arrow_right.png')} resizeMode={'contain'} />
								</View>
							</TouchableOpacity> */}
						</View>

						{!this.props.insta_token && (
							<TouchableOpacity
								style={[styles.bigBtn, styles.bigBtn_w, styles.bigBtn_bor]}
								onPress={() => {
									this.ToSettings()
								}}
							>
								<FastImage
									style={[styles.bigBtnImg]}
									resizeMode={FastImage.resizeMode.contain}
									source={require('@assets/img/post_insta_ico.png')}
								/>
								<View>
									<Text style={[styles.bigBtnText, styles.bigBtnText_b]}>{I18n.t('PROFILE_SETTINGS.CONNECT_INSTA')}</Text>
									<Text style={[styles.bigBtnText_sm]}>{I18n.t('PROFILE_SETTINGS.MIN_SUBS')}</Text>
								</View>
								<View style={styles.priceContainer}>
									<View style={styles.price}>
										<Text style={[styles.price_text]}>{`+ 5 ${this.props.profileState.currency}`}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}

						

						{/* <TouchableOpacity onPress={() => this.ToEdit()} style={styles.text_container_android}>
								<View style={styles.text_item}>
									<Text style={styles.title}>{I18n.t('NAMES')}</Text>
									<Text style={styles.name}>{this.state.user.username}</Text>
								</View>
								<View style={styles.text_item}>
									<Text style={styles.title}>{I18n.t('PROFILE_PAGE.PHONE')}</Text>
									<Text style={styles.phone}>{this.state.user.phone}</Text>
								</View>
								{this.state.user.birthDay ? (
									<View style={styles.text_item}>
										<Text style={styles.title}>{I18n.t('SIGN.AGE')}</Text>
										<Text style={styles.phone}>{this.state.user.birthDay}</Text>
									</View>
								) : null}
								{this.state.user.sex === 1 || this.state.user.sex === 0 ? (
									<View style={styles.text_item}>
										<Text style={styles.title}>{I18n.t('PROFILE_PAGE.SEX')}</Text>
										<Text style={styles.phone}>
											{this.state.user.sex === 0 && I18n.t('PROFILE_PAGE.FEMALE')}
											{this.state.user.sex === 1 && I18n.t('PROFILE_PAGE.MALE')}
										</Text>
									</View>
								) : null}
							</TouchableOpacity>					 */}
					</View>
					{/* <RefLink
						toogle={this.state.toogle}
						setToogle={this.setToogle}
						link={this.state.refferal_link}
						price={this.state.refferal_price}
					/> */}
				</ScrollView>
				<FooterNavigation />
			</View>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.profileState,
		userColor: state.userColor,
		userColor: state.userColor,
		token: state.token,
		profileState: state.profileState,
		insta_token: state.insta_token,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
		},
		dispatch,
	)

export default connect(mapStateToProps, mapDispatchToProps)(NewProfile)
