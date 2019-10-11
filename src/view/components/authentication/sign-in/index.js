import React from "react"
import { View, KeyboardAvoidingView, ScrollView, Text, Keyboard, Image } from "react-native"
import { Button } from "native-base"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { signIn } from "@reducers/sign-in"
import { signInConfirm } from "@reducers/sign-in-confirm"
import LinearGradient from "react-native-linear-gradient"
import Header from "@containers/header"
import Dropdown from "@containers/signForm/signForm"
import Touchable from "@containers/custom/custom-button/custom-button"
import I18n from "@locales/I18n"
import styles from "./styles"
const initialState = {
  phone: "",
  code: "",
  validate: false,
  accept: false,
  mask: 0,
}

class SignIn extends React.PureComponent {
  state = initialState

  componentDidUpdate = (prevProps, prevState) => {
    const { phone, code } = this.state
    if (prevState.phone !== phone || prevState.code !== code) {
      const accept = phone.length === 12 && code
      this.setState({ accept })
    }
    if (prevProps.sign_in.code !== this.props.sign_in.code && this.props.sign_in.code) {
      if (this.props.sign_in.code === -1) {
        this.setState({ validate: true })
      }
    }
    if (prevProps.sign_in_confirm.code !== this.props.sign_in_confirm.code && this.props.sign_in_confirm.code) {
      if (this.props.sign_in_confirm.code === -1) {
        this.setState({ validate: true })
      }
    }
  }

  handleChangePhone = phone => this.setState({ phone: phone.trim() })

  handleChangeCode = code => this.setState({ code })

  handleChangeMask = mask => this.setState({ mask })

  handleFocusPhone = () => this.setState({ validate: false })

  handleSignIn = () => {
    Keyboard.dismiss()
    const { code, phone } = this.state
    const { sms } = this.props
    const number = "+" + `${code}${phone}`.replace(/\D/g, "")
    if (sms) {
      this.props.signIn(number)
    } else {
      this.props.signInConfirm(number)
    }
  }

  render = () => {
    const { country, pink, white } = this.props
    const { phone, validate, accept } = this.state
    const color = accept ? pink : white
    return (
      <View style={styles.layout}>
        <Header route={"Start"} title={I18n.t("SIGN_IN_TITLE")} />
        <KeyboardAvoidingView style={styles.keyboard} behavior={"padding"}>
          <ScrollView
            contentContainerStyle={[styles.scroll, styles.align]}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.wrapper}>
              <Text style={[styles.text, styles.left]}>{I18n.t("SIGN.ENTER_PHONE_NUMBER")}</Text>
            </View>
            <Dropdown
              data={country}
              value={phone}
              setPhoneNumber={this.handleChangePhone}
              setCode={this.handleChangeCode}
              onFocus={this.handleFocusPhone}
              maskLength={this.handleChangeMask}
            >
              {validate && <Image style={styles.image} source={require("@assets/img/eyes.png")} />}
            </Dropdown>
            <View style={styles.wrapper}>
              <Text style={[styles.text, styles.red_t, styles.right, { opacity: validate ? 1 : 0 }]}>
                {I18n.t("SIGN.CHECK_PHONE_NUMBER")}
              </Text>
            </View>
            {/* <Touchable
							color={color}
							active={accept}
							disabled={!accept}
							handler={this.handleSignIn}
							title={I18n.t('SIGN_IN').toUpperCase()}
						/> */}
            <Button full rounded style={[styles.button, accept ? styles.red : styles.gray]} onPress={this.handleSignIn}>
              <Text style={[styles.text, accept && styles.white_t]}>{I18n.t("SIGN_IN").toUpperCase()}</Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  pink: state.userColor.pink,
  white: state.userColor.white,
  country: state.country.list,
  sms: state.country.sms,
  sign_in: state.sign_in,
  sign_in_confirm: state.sign_in_confirm,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn,
      signInConfirm,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn)
