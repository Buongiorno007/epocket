import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: width * 0.85,
    height: width * 0.22,
    marginBottom: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    alignSelf : 'center',
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width * 0.85 * 0.6
  },
  button: {
    backgroundColor: colors.drag_panel_color,
    elevation: 5,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5,
    width: 45,
    height: 45,
    borderRadius: 7,
    alignSelf: "flex-start",
    marginRight: 5,
    marginLeft: 5
  },
  photo: {
    width: 45,
    height: 45,
    borderRadius: 7,
    resizeMode : 'contain',
  },
  title: {
    height: width * 0.12,
    width : width * 0.38,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  text: {
    color: colors.black,
    fontSize: width * 0.035,
    marginLeft: 2,
    marginRight: 2
  },
  calculate: {
    width: width * 0.85 * 0.35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calculate_button: {
    backgroundColor: colors.white,
    width: 35,
    height: 35,
    elevation: 8,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 2
  },
  value: {
    fontSize: 16,
    color: colors.black
  }
});
