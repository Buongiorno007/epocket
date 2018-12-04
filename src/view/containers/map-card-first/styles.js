import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: width * 0.4,
    width: width * 0.45,
    backgroundColor: colors.black,
    borderRadius: 12,
    marginLeft: width * 0.05,
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    elevation: 5,

  },
  price: {
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    color: colors.white_o70
  },
  owner: {
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    color: colors.white
  },
  time_range: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: colors.black_o60
  }
});
