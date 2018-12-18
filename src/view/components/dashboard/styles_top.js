import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content_end: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  content_center: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.15
  },
  content_old: {
    justifyContent: "flex-start",
    alignItems: "center",
    top: 30
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
    height: 25,
    borderRightWidth: 1,
    borderColor: colors.white_o25,
  },
  icon: {
    width: 15,
    height: 15,
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
    fontSize: 14,
    width: width * 0.3,
  },
  epc_counter_container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  epc_counter_container_currency: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  epc_counter: {
    paddingTop: 5,
    color: colors.white,
    fontFamily: "Rubik-Light",
  },
  epc_counter_currency: {
    color: colors.white,
    fontFamily: "Rubik-Light",
    fontSize: 15,
    paddingBottom: 5,
  },
  epc_counter_info: {
    paddingLeft: 0
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time_counter: {
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
    paddingTop: 5,
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
  },
  cashout_text_container: {
    width: width * 0.85,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    zIndex: 2,
    top: height * 0.15,
    paddingBottom: 10
  },
  general_text: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: colors.white
  },
  general_text_big: {
    fontSize: 24,
    fontFamily: "Rubik-Medium",
    color: colors.white
  },
  finishMission_text: {
    fontSize: 18,
    fontFamily: "Rubik-Regular",
    color: colors.white,
    textAlign: "center"
  },
  text_small: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: colors.white_o89,
    textAlign: "center"
  },
  finishMission_text_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.85,
  }
});
