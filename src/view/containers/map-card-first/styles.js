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
    height: width * 0.1,
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
  },
  time_counter_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 20,
    width: width * 0.45 - 20
  },
  time_divider: {
    color: colors.white_o70
  },
  time_counter: {
    width: width * 0.1,
    backgroundColor: colors.white_o36,
    borderRadius: 25
  },
  time_counter_text: {
    color: colors.white,
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    padding: 2,
    textAlign: "center"
  },
  social_card: {
    height: width * 0.4,
    width: width * 0.4,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  social_container_cart: {
    height: width * 0.4,
    width: width * 0.4,
  },
  social_icon: {
    height: 30,
    width: 30,
  },
  social_text: {
    fontFamily: "Rubik",
    fontSize: 10,
    color: colors.black_90,
    textAlign: "center"
  }
});
