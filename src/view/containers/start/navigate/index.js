import React from "react"
import { View } from "react-native"
import { Button, Text } from "native-base"
import LinearGradient from "react-native-linear-gradient"
import I18n from "@locales/I18n"
import route from "@services/route"
import styles from "./styles"

const Navigate = () => {

  const sign_in = () => route.navigate("SignIn")
  const sign_up = () => route.navigate("SignUp")

  return (
    <View style={styles.layout}>
      <Button full rounded style={[styles.button, styles.semi_t]} onPress={sign_in}>
        <Text uppercase style={[styles.text]}>
          {I18n.t("SIGN_IN_TITLE")}
        </Text>
      </Button>
      <Button full rounded style={styles.button} onPress={sign_up}>
        <View style={styles.gradient}>
          <Text uppercase style={[styles.text, styles.sign_up]}>
            {I18n.t("SIGN_UP_TITLE")}
          </Text>
        </View>
      </Button>
    </View>
  )
}

export default Navigate
