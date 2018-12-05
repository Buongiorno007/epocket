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
    padding: 10,
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
  top_container: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    alignItems: "flex-start",

  },
  list: {
    height: width * 0.2,
    width: width * 0.4 - 20,
    justifyContent: "flex-end"
  },
  list_content: {
  },
  owner: {
    fontFamily: "Rubik-Bold",
    fontSize: 12,
    color: colors.black
  },
  time_range: {
    fontFamily: "Rubik",
    fontSize: 10,
    color: colors.black_90
  },
  list_item_text: {
    fontFamily: "Rubik-Regular",
    fontSize: 11,
    color: colors.black_90
  }
});
