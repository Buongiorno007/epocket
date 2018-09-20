import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  main_view: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.drag_panel_color
  },
  user_edit_header_container: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    zIndex: 1,
    backgroundColor: "transparent",
    position: "absolute"
  },
  user_edit_container: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
  name: {
    color: "#000",
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Rubik-Bold"
  },
  phone: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Rubik-Regular"
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  photo_container: {
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  text_container: {
    height: 100,
    bottom: 15,
    position: "relative"
  },
  btn_container: {
    height: 100,
    bottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2
  },
  edit_photo_btn: {
    width: 100,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    zIndex: 1,
    left : 1
  },
  edit_photo_btn_container: {
    width: 102,
    height: 27,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.pink_082,
    borderRadius : 50
  },
  btn: {
    zIndex: 1
  },
  edit_photo_btn_text: {
    fontSize: 8,
    fontFamily: "Rubik-Bold",
    color: colors.pink_082
  },
  text_container_item: {
    width: width * 0.75,
  },
  text_container_input: {
    fontSize: 14,
    fontFamily: "Rubik-Regular"
  },
  text_container_label: {
    marginTop : 5,
    fontSize: 10,
    fontFamily: "Rubik-Regular"
  },
  cross: {
    width: 20,
    height: 20
  },
  exit_button: {
    top: 12,
    width: 40,
    height: 40,
    marginTop: 5,
    marginLeft: width * 0.82,
    justifyContent: "center",
    alignItems: "center"
  },
  keyboard_avoid_view: {
    top: 0,
    left: 0,
    right: 0,
    height: height - 150,
    width: width
  },
  main: {
    top: 0,
    left: 0,
    right: 0,
    height: height,
    width: width,
    backgroundColor: colors.drag_panel_color
  }
});
