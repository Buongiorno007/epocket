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
    alignSelf: 'center',
    justifyContent: "space-between",
  },
  info: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: colors.drag_panel_color,
    width: 45,
    height: 45,
    borderRadius: 23,
    alignSelf: "flex-start",
    marginRight: 20
  },
  photo: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },
  title: {
    height: width * 0.12,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  text: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: "Rubik-Medium",
    color: colors.black
  },
  text_count: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: colors.black
  },
  text_epc: {
    fontSize: 8,
    fontFamily: "Rubik-Regular",
    color: colors.black_38
  },
  calculate: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calculate_button: {
    backgroundColor: colors.white,
    width: 35,
    height: 35,
    elevation: 4,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },
  value: {
    fontSize: 16,
    color: colors.black
  }
});
