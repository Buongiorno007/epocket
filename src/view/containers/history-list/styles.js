import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  list: {
    height: 500,
    flexDirection: "column",
  },
  empty: {
    height: 500,
    flexDirection: "column",
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04
  },
  summary: {
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04,
    paddingTop: width * 0.12,
    paddingBottom: width * 0.02,
    flexDirection: "row"
  },
  summary_bold: {
    flex: 1,
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    color: colors.black_o60,
    alignSelf: "flex-end"
  },
  summary_light: {
    flex: 4,
    fontFamily: "Rubik-Regular",
    fontSize: 11,
    color: colors.sum_grey,
    alignSelf: "flex-start"
  },
  filler: {
    height: height * 0.3
  },
  empty_text: {
    width: 0.85
  }
});
