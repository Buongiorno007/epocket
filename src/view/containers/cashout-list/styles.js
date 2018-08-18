import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingTop: width * 0.075,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    position: "absolute",
    height: height * 0.75,
    width: width,
    bottom: 50,
    backgroundColor: "rgba(245, 249, 254, 1)",
    zIndex: 2
  },
  scroll: {
    width: width,
    marginBottom: 20
  },
  empty: {
    width: width,
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04
  }
});
