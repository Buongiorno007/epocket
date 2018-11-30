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
  dot: {
    position: "absolute",
    bottom: 5,
    backgroundColor: colors.pink,
    height: 5,
    width: 5,
    borderRadius: 5
  }
});
