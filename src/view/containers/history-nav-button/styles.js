import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  semi_transparent_button_disabled: {
    backgroundColor: colors.white_o36,
    width: (width * 0.85)/2-20,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 12,
    zIndex : 10

  },
  semi_transparent_button_active: {
    backgroundColor: colors.white,
    width: (width * 0.85)/2-20,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 5,
    zIndex : 10
    // elevation: 2,
    // shadowColor: colors.card_shadow,
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowRadius: 2,
    // shadowOpacity: 10
  },
  button_text_active: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "center"
  },
  button_text_disabled: {
    color: colors.drag_panel_color,
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "center"
  }
});
