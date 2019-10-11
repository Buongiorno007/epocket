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
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { bindActionCreators } from 'redux'
import ImagePicker from 'react-native-image-picker'
//containers
import CustomButton from '@containers/custom/custom-button/custom-button'
import Header from '@containers/header'
import CustomPhoto from '@containers/custom/custom-photo/custom-photo'
//reducers
import { loaderState } from '@reducers/loader'
import { saveUser } from '@reducers/profile-state'
import { setColor } from '@reducers/user-color'
//services
import { serializeJSON } from '@services/serialize-json'
import NavigationService from '@services/route'
import { httpPost } from '@services/http'
//constants
import { urls } from '@constants/urls'
import { ICONS } from '@constants/icons'
import { colors } from '@constants/colors'
//locales
import I18n from '@locales/I18n'
//style
import styles from './styles'

class ProfEdit extends React.Component {
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
		let Reg61 = /^.*[^A-zА-яЁё ].*$/
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
			birth_year: this.state.age,
			photo: 'data:image/jpeg;base64,' + this.state.photo,
		}
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
				user.sex ? this.props.setColor(true) : this.props.setColor(false)

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
			takePhotoButtonTitle: I18n.t('TAKE_PICTURE'),
			chooseFromLibraryButtonTitle: I18n.t('CHOOSE_G'),
			cancelButtonTitle: I18n.t('CANCEL'),
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
			<View style={styles.container}>
				<Image style={styles.img} source={require('@assets/img/bubles.png')} />
				<Header route='Main' title={I18n.t('PROFILE_SETTINGS.EDIT')} />
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
								placeholderTextColor={colors.black111}
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
						{/* <CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.changeProfile()
							}}
							active={this.state.acceptButton}
							title={I18n.t('PROFILE_SETTINGS.CONFIRM').toUpperCase()}
						/> */}
						<Button full rounded style={[styles.button]} onPress={() => {this.changeProfile()}} disabled={!this.state.acceptButton}>
							<Text style={[styles.text]}>
								{I18n.t('PROFILE_SETTINGS.CONFIRM').toUpperCase()}
							</Text>
						</Button>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
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
