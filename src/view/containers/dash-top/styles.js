import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  content: {
    top: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  disabled: {
    display: "none"
  },
  location: {
    height: 45,
    width: width * 0.85,
    backgroundColor: colors.white_o36,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  location_left: {
    width: (width * 0.85) / 2 - 1,
    flexDirection: "row",
    alignItems: 'center',
  },
  location_right: {
    width: (width * 0.85) / 2 - 1,
    flexDirection: "row",
    alignItems: 'center',
  },
  middle_border: {
    height : 25,
    borderRightWidth: 1,
    borderColor: colors.white_o25,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginLeft: 12,
    marginRight: 12,
  },
  up_text: {
    color: colors.white_o74,
    fontFamily: "Rubik-Light",
    fontSize: 12
  },
  down_text: {
    color: colors.white,
    fontFamily: "Rubik-Bold",
    fontSize: 14
  },
  epc_counter_container: {
    top: 18,
    height: 80,
    width: width * 0.85,
    flexDirection: "row",
    alignItems: "center"
  },
  epc_counter: {
    top: 5,
    color: colors.white,
    fontFamily: "Rubik-Light",
    fontSize: 76
  },
  epc_counter_info: {
    paddingLeft: 10
  },
  epc: {
    color: colors.white,
    fontFamily: "Rubik-Bold",
    fontSize: 18
  },
  epc_info: {
    color: colors.white,
    fontFamily: "Rubik-Light",
    fontSize: 18
  },
  time_counter_container: {
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.85
  },
  time_counter: {
    width: width * 0.25,
    backgroundColor: colors.white_o36,
    borderRadius: 25
  },
  time_counter_text: {
    color: colors.white,
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    padding: 2,
    textAlign: "center"
  },
  time_divider: {
    color: colors.white_o70
  },
  time_divider_pink: {
    color: colors.pink
  },
  small_epc_counter_container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  small_time_counter_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    justifyContent: "space-between",
    width: width * 0.6
  },
  small_time_counter: {
    width: width * 0.15,
    backgroundColor: colors.white_o36,
    borderRadius: 25
  },
  small_epc_counter: {
    color: colors.white,
    fontFamily: "Rubik-Light",
    fontSize: 30
  },
  small_head: {
    top: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  main_task_expired_container: {
    width: width * 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  main_task_expired: {
    textAlign: "center",
    paddingTop: 20,
    fontFamily: "Rubik",
    fontSize: 20,
    color: colors.white
  }
});
