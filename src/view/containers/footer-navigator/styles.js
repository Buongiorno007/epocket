import { StyleSheet, Dimensions, Platform } from "react-native"

import { colors } from "../../../constants/colors"

const { width, height } = Dimensions.get("window")
const platform = Platform.OS
let isIphoneX = platform === "ios" && height === 812 && width === 375

const screenHeight = Dimensions.get('screen').height
const windowHeight = Dimensions.get('window').height

export default StyleSheet.create({
  footer_container: {
    width: width,
    height: 61,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    backgroundColor: colors.white,
    bottom: screenHeight !== windowHeight ? 48 : 0,
    zIndex: 999,
    marginBottom: isIphoneX ? 20 : 0
  },
  footer_tab: {
    backgroundColor: colors.white,
    width: width * 0.25,
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  footer_tab_icon: {
    width: 24,
    height: 24,
  },
  footer_tab_icon_active: {
    width: 24,
    height: 24,
  },
  footer_tab_offset: {
    width: width * 0.25,
  },
  footer_tab_central: {
    width: width * 0.1,
  },
  footer_tab_icon_offset_left: {
    position: "relative",
    left: -width * 0.025,
  },
  footer_tab_icon_offset_right: {
    position: "relative",
    right: -width * 0.025,
  },
  footer_tab_text: {
    width: width * 0.25,
    textAlign: "center",
    color: colors.black111,
    fontSize: 10,
    fontFamily: "Rubik-Medium",
  },
  footer_tab_text_margin_bottom: { marginBottom: 15 },
  footer_small_logo: {
    position: "absolute",
    top: 10,
    height: 15,
    width: 15,
  },
  grad: {
    position: "absolute",
    bottom: 60,
    width: width,
    height: 25,
  },
  bTop: {
		borderTopWidth: 1,
    borderTopColor: colors.mild_gray,
  }
})
