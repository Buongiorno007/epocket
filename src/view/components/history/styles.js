import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  grad: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center"
  },
  list_container: {
    backgroundColor: colors.drag_panel_color,
    top: 15,


    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: height * 0.75,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom : 50

  },
  nav_buttons: {
    width : width* 0.85,
    height : 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex : 1
  },
  history_nav: {
    top: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
