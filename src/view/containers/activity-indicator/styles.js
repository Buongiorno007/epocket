import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    position: "absolute",
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 99
  },
  loader_image: {
    position : 'absolute',
    bottom : height * 0.25,
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
    zIndex: 99
  }
});
