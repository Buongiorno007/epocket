import { StyleSheet, Dimensions, Platform } from "react-native"
import { colors } from "@constants/colors"
const { width, height } = Dimensions.get("window")
const iPhoneX = Platform.OS === "ios" && (height === 812 || width === 812 || height === 896 || width === 896)

export default StyleSheet.create({
  grad: {
    top: iPhoneX ? 40 : 32,
    height: iPhoneX ? height - 100 : height - 92,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  game_aval: {
    borderRadius: 24,
    backgroundColor: colors.black111,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 16,
  },
  game_aval_t: {
    color: colors.white,
  },
  zifi_text: {
    textAlign: "center",
    color: colors.light_gray,
    fontSize: 16,
    fontFamily: "Rubik-BoldItalic",
    marginBottom: 24,
  },
  zifi: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 24,
    alignSelf: "center",
  },
  game_cost_text: {
    color: colors.blood_red,
    fontSize: 16,
    fontFamily: "Rubik-Bold",
    textAlign: "center",
  },
  game_desc_text: {
    textAlign: 'center',
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    color: colors.black40,
    marginTop: 15,
  },
  button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 10,
    elevation: 0,
    backgroundColor: colors.blood_red,
  },
  button_t: {
    fontFamily: 'Rubik-Medium',
    fontSize: 14,
    color: colors.white,
  }
})
