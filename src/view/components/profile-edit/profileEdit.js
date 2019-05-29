import React from 'react'
import {
	View,
	Image,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	Platform,
} from 'react-native'
import FastImage from 'react-native-fast-image'

import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ImagePicker from 'react-native-image-picker'

//containers
import BackButton from '@containers/back/back'
import CustomButton from '@containers/custom-button/custom-button'
import AndroidHeader from '@containers/androidHeader/androidHeader'
//reducers
import { loaderState } from '@reducers/loader'
//services
import NavigationService from '@services/route'
import { httpPost } from '@services/http'
//constants
import { urls } from '@constants/urls'
//locales
import I18n from '@locales/I18n'
//style
import styles from './style'
import { ICONS } from '@constants/icons'
//will be removed
import { saveUser } from '../../../reducers/profile-state'
import { setColor } from '../../../reducers/user-color'
import { serializeJSON } from '../../../services/serialize-json'
import CustomPhoto from '@containers/custom-photo/custom-photo'
import { ageToDate } from '@services/converteDate'

class ProfEdit extends React.Component {
	static navigationOptions = () => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route='Main' />,
		title: I18n.t('PROFILE_SETTINGS.EDIT'),
		headerStyle: styles.headerBackground,
		headerTitleStyle: styles.headerTitle,
	})
	state = {
		gender: 0,
		name: '',
		age: '',
		photo: '',
		notCorrect: false,
		acceptButton: false,
	}

	componentDidMount() {
		const { profileState } = this.props
		this.setState({
			name: profileState.name || '',
			age: profileState.birthDay || '',
			gender: profileState.sex + 1 || 0,
			photo: profileState.photo || ICONS.TEST.SHOE_PHOTO,
		})
		this.props.loaderState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		const { name, age, gender, photo } = this.state
		if (
			prevState.name !== name ||
			prevState.age !== age ||
			prevState.gender !== gender ||
			prevState.photo !== photo
		) {
			const check = name.length >= 2 && age && gender && photo
			this.setState({ acceptButton: check })
		}
	}

	addTextFirstName = (value) => {
		let Reg61 = /^.*[^A-zА-яЁё].*$/
		if (Reg61.test(value)) {
			console.log('Not only letters')
		} else {
			this.setState({
				name: value,
			})
		}
	}

	changeProfile = () => {
		this.props.loaderState(true)
		let body = {
			name: this.state.name,
			sex: this.state.gender - 1,
			birthDay: ageToDate(this.state.age),
			photo: 'data:image/jpeg;base64,' + this.state.photo,
		}
		console.log(body, 'BODY')
		httpPost(urls.edit_profile_data, serializeJSON(body), this.props.token, true).then(
			(result) => {
				let user = {
					name: this.state.name,
					photo: this.state.photo,
					sex: this.state.gender - 1,
					birthDay: this.state.age,
					phone: this.props.profileState.phone,
					currency: this.props.profileState.currency,
				}
				if (user.sex) {
					this.props.setColor(true)
				} else {
					this.props.setColor(false)
				}
				this.props.saveUser(user)
				NavigationService.navigate('Main')
			},
			(error) => {
				console.log(error, 'ERROR')
				this.setState({ notCorrect: true })
				this.props.loaderState(false)
			},
		)
	}
	PhotoEdit = () => {
		const options = {
			title: I18n.t('PROFILE_PAGE.CHOOSE_AVATAR'),
			mediaType: 'photo',
			maxWidth: 1000,
			maxHeight: 1000,
			takePhotoButtonTitle: 'Сделать фото',
			chooseFromLibraryButtonTitle: 'Выбрать из галереи',
			cancelButtonTitle: 'Отмена',
			quality: Platform.OS === 'ios' ? 0.75 : 1,
		}
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else {
				this.setState({ photo: response.data })
			}
		})
	}
	render() {
		return (
			<LinearGradient
				colors={['#9B45F0', '#D833C8', '#F55890', '#FF8D50', '#F7BB42']}
				start={{ x: 0.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<Image style={styles.img} source={require('@assets/img/bubles.png')} />

				<AndroidHeader route='Main' title={I18n.t('PROFILE_SETTINGS.EDIT')} />
				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView contentContainerStyle={styles.scrollView}>
						<View style={styles.photo_container}>
							<CustomPhoto edit src={this.state.photo} photoEdit={() => this.PhotoEdit()} />
						</View>

						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.FIRST_SECOND_NAME')}</Text>
						</View>
						<View style={styles.fullWidth}>
							<TextInput
								value={this.state.name}
								placeholder={I18n.t('SIGN.FIRST_SECOND_NAME')}
								style={styles.textInput}
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
								onChangeText={(value) => this.addTextFirstName(value)}
							/>
						</View>
						<View style={styles.fullWidth}>
							<Text style={styles.textLeft}>{I18n.t('SIGN.AGE')}</Text>
						</View>
						<View style={styles.fullWidth}>
							<TextInput
								style={styles.textInput}
								value={`${this.state.age}`}
								keyboardType={'numeric'}
								onChangeText={(value) => this.setState({ age: value })}
								maxLength={2}
								onFocus={() => this.setState({ notCorrect: false })}
							/>
						</View>
						<View style={styles.buttonsBlock}>
							<TouchableOpacity
								style={[styles.leftButton, this.state.gender === 1 ? styles.genderActive : null]}
								onPress={() => this.setState({ gender: 1 })}
							>
								<Text style={this.state.gender === 1 ? styles.genderActiveText : styles.genderText}>
									{I18n.t('SIGN.GIRL')}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.rightButton, this.state.gender === 2 ? styles.genderActive : null]}
								onPress={() => this.setState({ gender: 2 })}
							>
								<Text style={this.state.gender === 2 ? styles.genderActiveText : styles.genderText}>
									{I18n.t('SIGN.BOY')}
								</Text>
							</TouchableOpacity>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.changeProfile()
							}}
							active={this.state.acceptButton}
							title={I18n.t('PROFILE_SETTINGS.CONFIRM').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	profileState: state.profileState,
	token: state.token,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
			saveUser,
			setColor,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProfEdit)
