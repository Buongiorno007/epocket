import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: width * 0.4,
    width: width * 0.4,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginLeft: width * 0.05,
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    elevation: 5,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  price: {
    fontFamily: "Rubik-Regular",
    fontSize: 15,
    color: colors.black_o60
  },
  owner: {
    fontFamily: "Rubik-Bold",
    fontSize: 15
  },
  time_range: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: colors.black_o60
  }
});
