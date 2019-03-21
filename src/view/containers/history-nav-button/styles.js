import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  button: {
    width: (width * 0.85) / 2,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 12,
    zIndex: 10
  },
  button_text: {
    color: colors.black,
    width: (width * 0.85) / 2,
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    textAlignVertical: "center",
    textAlign: "center"
  },
  disabled_text: {
    color: colors.black_50,
    width: (width * 0.85) / 2,
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    textAlignVertical: "center",
    textAlign: "center"
  },
  dot: {
    position: "absolute",
    bottom: 5,
    height: 3,
    width: 40,
    borderRadius: 5
  },
  number: {
    color: colors.white,
    fontFamily: "Rubik-Medium",
    fontSize: 9,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    textAlignVertical: "center",
    textAlign: "center"
  },
  cart_number: {
    position: "absolute",
    top: 5,
    right: (width * 0.85) / 10,
    height: 16,
    width: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  }
});
