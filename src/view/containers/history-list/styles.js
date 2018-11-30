import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  container : {
    height: height * 0.65,
  },
  list: {
    height: height * 0.75,
    flexDirection: "column",
  },
  empty: {
    height: height * 0.75,
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
    paddingTop: width * 0.035,
    paddingBottom: width * 0.035,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  summary_bold: {
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    color: colors.black_o60,
    alignSelf: "flex-end"
  },
  summary_light: {
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
