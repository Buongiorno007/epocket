import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  received_card: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 7,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    marginTop: 8,
    marginBottom: 8,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5
  },
  cost: {
    flex: 1,
    paddingLeft: width * 0.05
  },
  price_text: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color : colors.black_o60
  },
  date_text: {
    fontFamily: "Rubik-Regular",
    fontSize: 11,
    color : colors.black_o60
  },
  name: {
    flex: 4,
    paddingLeft: 10
  },
  name_text: {
    fontFamily: "Rubik-Bold",
    fontSize: 15
  },
  item_name_text: {
    fontFamily: "Rubik-Medium",
    fontSize: 15
  },
  amount: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color : colors.black_o60
  },
  date: {
    flex: 2,
    paddingRight: width * 0.05,
    flexDirection: "column",
    alignItems: "flex-end"
  },
  spent_card: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 7,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    marginTop: 8,
    marginBottom: 8,
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5
  },
  name_and_price: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: width * 0.05
  }
});
