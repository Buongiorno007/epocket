import { StyleSheet, Dimensions } from "react-native";

import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  main: {
    flex: 1,
    width: width,
    backgroundColor: colors.drag_panel_color,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  list_view: {
    flex: 1,
    width: width,
    backgroundColor: colors.drag_panel_color,
    overflow: "hidden",
  },
  contentContainerStyle: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 50,
    paddingTop: 10
  },
  tasks: {
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    width: width * 0.85,
    textAlign: "left",
    alignSelf: "center",
    color: colors.sum_grey
  },
  no_tasks: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  no_tasks_text: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  shadow: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    alignSelf: "center",
    shadowColor: colors.drag_panel_color,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    backgroundColor: colors.drag_panel_color,
    zIndex: 10,
  },
  disabled: {
    display: "none"
  }
});
