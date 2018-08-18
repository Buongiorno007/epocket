import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
//containers
//constants
//redux
//services
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  scanner: {
    height: width * 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  frame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    width: width * 0.6,
    height: width * 0.6
  },
  image: {
    position: "absolute",
    width: width * 0.65,
    height: width * 0.65
  },
  button: {
    width: width * 0.1,
    height: width * 0.1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    width: width * 0.04,
    height: width * 0.04,
    backgroundColor: "#000"
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    position: "absolute"
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  },
  activity_indicator: {
    top: -100
  }
});
