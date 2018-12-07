import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingTop: width * 0.075,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    position: "absolute",
    height: height * 0.75,
    width: width,
    bottom: 50,
    backgroundColor: "rgba(245, 249, 254, 1)",
    zIndex: 2
  },
  header: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  header_container: {
    width: width * 0.85,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header_name: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: colors.black
  },
  positions: {
    fontSize: 8,
    fontFamily: "Rubik-Regular",
    color: colors.black_38
  },
  left_part: {
    width: width * 0.6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  round_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 30
  },
  arrow: {
    width: 20,
    height: 20,
  },
  header_text: {
    flexDirection: "column",
  },
  content: {
    width: width,
  },
  scroll: {
    width: width,
    marginBottom: 20
  },
  empty: {
    width: width,
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04
  }
});
