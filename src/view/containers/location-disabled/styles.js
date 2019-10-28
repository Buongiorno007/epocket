import { StyleSheet, Dimensions, Platform } from "react-native"
const { width } = Dimensions.get("window")
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height
import { colors } from "../../../constants/colors"

export default StyleSheet.create({
  main_view: {
    position: "absolute",
    flex: 1,
    width: width,
    height: height,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // bottom: Platform.OS === "ios" ? 60 : 0,
    bottom: Platform.OS === "ios" ? 0 : 0,
    zIndex: 500,
  },
  circle_container: {
    zIndex: 1001,
    width: width * 0.85,
    height: height * 0.3,
    bottom: Platform.OS === "ios" ? -60 : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  virgin_container: {
    bottom: 60,
  },
  virgin_btn_container: {
    bottom: 10,
  },
  btnContainer: {
    zIndex: 1001,
    bottom: Platform.OS === "ios" ? -60 : 0,
  },
  enable_location: {
    width: width * 0.6,
    borderRadius: 40,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: colors.blood_red,
  },
  location_disable_text: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.black,
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
  location_disable_text_white: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.white,
    fontFamily: "Rubik-Bold",
    fontSize: 20,
  },
  location_enable_text: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.white,
    position: "absolute",
  },
  bottom_image: {
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    width: width,
    height: height * 0.9,
  },
})
