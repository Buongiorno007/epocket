import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    height: width * 0.65,
    width: width * 0.65,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginLeft: width * 0.05,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  inner_conainer: {
    height: width * 0.52,
    width: width * 0.52,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "Rubik-Bold",
    fontSize: 15,
    textAlign: "center",
    color: colors.map_dark_blue
  },
  price: {
    fontFamily: "Rubik-Medium",
    fontSize: 42,
    color: colors.pink
  },
  time_range: {
    fontFamily: "Rubik-Bold",
    fontSize: 14,
    color: colors.black41
  },
  time_text: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: colors.black41_054
  },
  bottom_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  name_container: {
    width: width * 0.5,
    padding: 10,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.map_dark_blue_02
  }
});
