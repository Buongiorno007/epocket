import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: width * 0.4,
    width: width * 0.45,
    borderRadius: 12,
    marginLeft: width * 0.05,
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
  card_background: {
    height: width * 0.4,
    width: width * 0.45,
  },
  card_image: {
    borderRadius: 12,
    resizeMode: "cover"
  },
  dark_cont: {
    height: width * 0.4,
    width: width * 0.45,
    borderRadius: 12,
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: colors.black_50
  },
  bottom_btn: {
    alignSelf: "flex-end"
  },
  timer: {
    width: width * 0.45 - 20,
    alignItems: "center",
    justifyContent: "center"
  },
  top_text: {
    width: width * 0.45 - 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
