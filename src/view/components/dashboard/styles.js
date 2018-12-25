import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  disabled: {
    display: "none"
  },
  main_view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dash_top: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    zIndex: 2
  },
  nav_buttons: {
    width: width * 0.85,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
    width: width,
    backgroundColor: "#ded"
  },
  grad: {
    position: "absolute",
    height: height,
    width: width
  },
  white: {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: colors.white
  },
  drag_container: {
    height: height * 0.65,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
    width: width,
    alignItems: "center",
    zIndex: 2,
    backgroundColor: colors.drag_panel_color
  },
  drag_container_small: {
    height: height * 0.57
  },
  drag_container_small_no_main_task: {
    height: height * 0.64
  },
  drag_container_big: {
    height: height * 0.75
  },
  drag_container_big_no_main_task: {
    height: height * 0.8
  },

  small_counter_container: {
    position: "absolute",
    top: 65,
    width: width * 0.85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  background_image: {
    position: "absolute",
    resizeMode: "cover",
    height: height,
    width: width,
    zIndex: 1,
  },
  background_image_mask: {
    position: "absolute",
    height: height,
    width: width,
    zIndex: 1,
    backgroundColor: colors.black_50
  },
});
