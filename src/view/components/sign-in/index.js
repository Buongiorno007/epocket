import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import Header from '@containers/androidHeader/androidHeader'
import TextInput from '@containers/signForm/signForm'
import Button from '@containers/custom-button/custom-button'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = typeof defaultProps

type State = typeof initialState

const initialState = {
	phone: '',
	code: '+380',
	validate: false,
	sms: false,
	accept: false,
}

const defaultProps = {
	colors: ['#F55890', '#FF9950'],
	start: { x: 1.0, y: 0.0 },
	end: { x: 0.0, y: 1.0 },
}

class SignIn extends React.Component<Props, State> {
	static defaultProps = defaultProps

	state = initialState

	componentDidMount = () => {}

	componentDidUpdate = (prevProps, prevState) => {
		const { phone, code } = this.state
		if (prevState.phone !== phone || prevState.code !== code) {
			const accept = phone.length === 12 && code
			this.setState({ accept })
		}
	}

	handleChangePhone = (phone) => this.setState({ phone: phone.trim() })

	handleChangeCode = (code) => this.setState({ code })

	handleFocusPhone = () => this.setState({ validate: false })

	handleSignIn = () => {
		Keyboard.dismiss()
	}

	render = () => {
		const { colors, start, end, country, pink, white } = this.props
		const { phone, validate, accept } = this.state
		const color = accept ? pink : white
		return (
			<LinearGradient colors={colors} start={start} end={end} style={styles.layout}>
				<Header route='Start' title={I18n.t('SIGN_IN_TITLE')} />
				<KeyboardAvoidingView style={styles.keyboard} behavior='padding'>
					<ScrollView
						contentContainerStyle={[styles.scroll, styles.align]}
						keyboardShouldPersistTaps='handled'
						scrollEnabled={false}
					>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.left]}>{I18n.t('SIGN.ENTER_PHONE_NUMBER')}</Text>
						</View>
						<TextInput
							data={country}
							value={phone}
							setPhoneNumber={this.handleChangePhone}
							setCode={this.handleChangeCode}
							onFocus={this.handleFocusPhone}
						>
							{validate && (
								<FastImage
									style={styles.image}
									source={require('@assets/img/eyes.png')}
									resizeMode={FastImage.resizeMode.contain}
								/>
							)}
						</TextInput>
						<View style={styles.wrapper}>
							<Text style={[styles.text, styles.right, { opacity: validate ? 1 : 0 }]}>
								{I18n.t('SIGN.CHECK_PHONE_NUMBER')}
							</Text>
						</View>
						<Button
							color={color}
							active={accept}
							disabled={!accept}
							handler={this.handleSignIn}
							title={I18n.t('SIGN_IN').toUpperCase()}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	pink: state.userColor.pink,
	white: state.userColor.white,
	country: state.country,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SignIn)
