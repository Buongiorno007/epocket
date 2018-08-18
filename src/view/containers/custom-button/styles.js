import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  button_container: {
    width: width * 0.85,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // overflow: "visible",
    borderRadius: 50,
    zIndex: 5
  },

  enabled_button: {
    backgroundColor: colors.white
  },
  button_text: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Rubik-Medium",
    fontSize: 10,
    zIndex: 6
  },
  disabled_button: {
    borderWidth: 1,
    borderColor: colors.white
  },
  disabled_button_text: {
    color: colors.white
  },
  gradient: {
    position: "absolute",
  }
});
