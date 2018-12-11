import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    height: height * 0.9,
    width: width,
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
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  borderTop: {
    paddingTop: 15,
    borderTopColor: colors.settings_gray,
    borderTopWidth: 1,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20
  },
  arrow: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  nav_buttons: {
    width: width * 0.85,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1
  },
  header_text: {
    flexDirection: "column",
    height: width * 0.12,
    justifyContent: "space-around",
  },
  content: {
    width: width,
  },
  container_for_scroll: {
    width: width,
  },
  scroll: {
    width: width,
    paddingTop: 15,
  },
  scroll_fixed: {
    width: width,
    height: height * 0.65,
    paddingTop: 15,
  },
  filler: {
    width: width,
    height: height * 0.1,
  },
  empty: {
    width: width,
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04
  },
  cart_container: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    alignItems: "center",
    paddingTop: 15,
    width: width,
    justifyContent: "center"
  }
});
