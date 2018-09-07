import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: "center"
  },
  top_image: {
    position: "relative",
    top: width * 0.1,
    height: 165,
    width: width,
    resizeMode: "contain"
  },

  bottom_image: {
    position: "absolute",
    bottom: 0,
    height: height * 0.45,
    width: width,
    resizeMode: "stretch"
  },
  background: {
    position: "absolute",
    // flex : 1,
    height: height,
    width: width,
    resizeMode: "stretch"
  },
  grad: {
    position: "absolute",
    height: height,
    width: width
  },
  start_title: {
    position: "relative",
    top: width * 0.1+50,
    color: colors.white,
    fontFamily: "Rubik-Light",
    fontSize: 18,
    textAlign: "center",
    width: width * 0.85
  },
  go_to_signin: {
    alignSelf: "center",
    height: 40,
    width: width * 0.85
  },
  go_to_signin_text: {
    color: colors.white,
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    alignSelf: "center",
    textAlign: "center",
    width: width * 0.85
  },
  signup_signin_buttons: {
    position: "absolute",
    bottom: 55,
    height: 100,
    width: width,
    justifyContent: "space-between"
  },
  signup_butto: {
    zIndex: 1
  }
});
