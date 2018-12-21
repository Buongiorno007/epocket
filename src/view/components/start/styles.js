import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: "center"
  },
  top_image: {
    position: "absolute",
    height: height,
    width: width,
    top: 0,
    left: 0
  },
  top_image_grad: {
    position: "absolute",
    height: height,
    width: width,
    top: 0,
    left: 0,
    resizeMode: "cover"
  },
  top_logo_image: {
    position: "absolute",
    height: 50,
    width: 50,
    top: width * 0.6
  },
  bottom_image: {
    position: "absolute",
    bottom: 0,
    height: height * 0.45,
    width: width,
  },
  background: {
    position: "absolute",
    height: height,
    width: width,
  },
  background_view: {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: "#595BF1"
  },
  grad: {
    position: "absolute",
    height: height,
    width: width
  },
  start_title: {
    position: "relative",
    top: width * 0.1 + 50,
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
