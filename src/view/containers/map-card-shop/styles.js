import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: width * 0.4,
    width: width * 0.35,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginLeft: width * 0.05,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  icon: {
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: width * 0.1
  },
  price: {
    fontFamily: "Rubik-Regular",
    fontSize: 8,
    textAlign: "center",
    color: colors.black_o30
  },
  text_cashout: {
    height: width * 0.07,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5
  },
  owner: {
    fontFamily: "Rubik-Medium",
    textAlign: "center",
    fontSize: 12,
    color: colors.black
  },
  time_range: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: colors.black_o60
  }
});
