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
    justifyContent: "flex-start",
    backgroundColor: colors.drag_panel_color,
  },
  header: {
    width: width,
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: "flex-end",
    justifyContent: 'flex-end',

  },
  settings_btn: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end'
  },
  settings_img: {
    height: 20,
    width: 20,
  },
  info: {
    width: width,
    flexDirection: 'column',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,

  },

  name: {
    color: colors.black,
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Rubik-Bold",
    letterSpacing: 2,
  },
  phone: {
    color: colors.black41_054,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Rubik-Regular",
  },
  photo_container: {
    width: width * 0.4,
    height: width * 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: 'center',
  },
  text_container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: width * 0.85,
    flexDirection: "column",
    height: width * 1.75
  },
  text_item: {
    marginBottom: 20
  },
  title: {
    color: colors.black41_09,
    fontSize: 15
  },
  btn_container: {
    width: width,
    height: height * 0.4,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center"
  },


});
