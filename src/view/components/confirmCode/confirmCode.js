import React from 'react'
import { View, Image, Text, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
//containers
import BackButton from '../../containers/back/back'
import CustomButton from '../../containers/custom-button/custom-button'
import AndroidHeader from '@containers/androidHeader/androidHeader'
//redux
import { setToken } from '../../../reducers/token'
import { loaderState } from '../../../reducers/loader'
import { setBalance } from '../../../reducers/user-balance'
import { connect } from 'react-redux'
import { setColor } from '../../../reducers/user-color'
import { bindActionCreators } from 'redux'
import { setInstaToken } from '../../../reducers/insta-token'
import { setFacebookToken } from '../../../reducers/facebook-token'
import { setProfileVirgin } from '../../../reducers/profile-virgin'
import { setGeoVirgin } from '../../../reducers/geo-virgin'
import { getPush } from '../../../reducers/push'
import { saveUser } from '../../../reducers/profile-state'
import { locationStateListener, locationState } from '../../../reducers/geolocation-status'
import { locationCoordsListener, setLocation } from '../../../reducers/geolocation-coords'
//services
import NavigationService from '../../../services/route'

//constants
import styles from './styles'

///////////////
import I18n from '@locales/I18n'

class confirmCode extends React.Component {
	interval
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <BackButton title={I18n.t('BACK')} route={navigation.state.params.back} />,
		title: navigation.state.params.title,
		headerStyle: styles.headerBackground,
		headerTitleStyle: styles.headerTitle,
	})

	state = {
		notCorrect: false,
		confirmCode: '',
		seconds: 60,
		phoneNumber: '',
		name: '',
		gender: '',
		date: new Date(),
	}

	componentDidMount() {
		const { params } = this.props.navigation.state
		const timeStamp = new Date().getTime() - params.age * 31536000000 || new Date().getTime()
		this.setState({
			phoneNumber: params.phone || '',
			name: params.name || '',
			gender: params.gender || '',
			date: new Date(timeStamp),
		})
		this.startInterval()
		this.props.loaderState(false)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.confirmCode !== this.state.confirmCode) {
			this.state.confirmCode.length === 6
				? this.setState({ acceptButton: true })
				: this.setState({ acceptButton: false })
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	startInterval() {
		this.interval = setInterval(() => {
			if (this.state.seconds) {
				this.setState({ seconds: this.state.seconds - 1 })
			} else {
				clearInterval(this.interval)
			}
		}, 1000)
	}

	sendCodeAgain() {
		if (!this.state.seconds) {
			//HERE WILL BE CODE SEND AGAIN
			this.setState({ seconds: 60 })
			this.startInterval()
			console.log('CODE SEND')
		}
	}

	sendResult() {
		this.props.loaderState(true)
		let body = {
			phone: this.state.phoneNumber,
			confirmCode: this.state.confirmCode,
			birthday: this.state.date,
			name: this.state.name,
			gender: this.state.gender,
		}
		NavigationService.navigate('CatCode')
	}

	render() {
		return (
			<LinearGradient
				colors={['#F55890', '#FF9950']}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<AndroidHeader
					route={this.props.navigation.state.params.back}
					title={this.props.navigation.state.params.title}
				/>

				<KeyboardAvoidingView behavior='padding' style={styles.grad}>
					<ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollView}>
						<TouchableOpacity
							style={[styles.resendCode, !this.state.seconds ? styles.resendCodeActive : null]}
							onPress={() => this.sendCodeAgain()}
						>
							<Text style={[styles.resendText, !this.state.seconds ? styles.resendTextActive : null]}>
								{I18n.t('SIGN.SEND_AGAIN')}
							</Text>
							{this.state.seconds && (
								<View style={styles.timerView}>
									<Text style={styles.timer}>{this.state.seconds}</Text>
								</View>
							)}
						</TouchableOpacity>
						<View style={styles.fullWidth}>
							<Text style={styles.title}>{I18n.t('SIGN.SENDED_CODE')}</Text>
						</View>
						<View style={styles.fullWidth}>
							<TextInput
								value={this.state.confirmCode}
								onChangeText={(value) => this.setState({ confirmCode: value })}
								placeholder={'-  -  -  -  -  -'}
								style={styles.textInput}
								keyboardType='numeric'
								placeholderTextColor={'#fff'}
								onFocus={() => this.setState({ notCorrect: false })}
								maxLength={6}
							/>
							{this.state.notCorrect && (
								<Image style={styles.eye} source={require('@assets/img/eyes.png')} />
							)}
						</View>
						<View style={styles.fullWidth}>
							<Text style={[styles.textRight, { opacity: this.state.notCorrect ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_CODE')}
							</Text>
						</View>
						<CustomButton
							color={this.state.acceptButton ? this.props.userColor.pink : this.props.userColor.white}
							handler={() => {
								this.sendResult()
							}}
							active={this.state.acceptButton}
							title={I18n.t('ACCEPT').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
})

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setToken,
			setBalance,
			loaderState,
			setInstaToken,
			setFacebookToken,
			setColor,
			getPush,
			saveUser,
			setProfileVirgin,
			setGeoVirgin,
			locationState,
			setLocation,
			locationStateListener,
			locationCoordsListener,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(confirmCode)
