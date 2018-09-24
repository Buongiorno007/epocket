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
    alignItems: "center",
    justifyContent: 'space-between',
    paddingLeft: width * 0.1 + 5,
    paddingRight: 5,
    backgroundColor: "transparent"
  },
  image_block: {
    flexDirection: 'row',
    height: height * 0.12,
    width: width,
    alignItems: "center",
    justifyContent: 'flex-start',
    backgroundColor: "transparent",
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
  },
  image_block_with_button: {
    flexDirection: 'row',
    height: height * 0.12,
    width: width,
    alignItems: "center",
    justifyContent: 'flex-start',
    backgroundColor: "transparent",
  },
  image_block_with_border: {
    borderBottomWidth: 1,
    borderColor: colors.settings_gray
  },
  image_block_with_top_border: {
    borderTopWidth: 1,
    borderColor: colors.settings_gray
  },
  image_block_text: {
    paddingLeft: 20,
    width: width * 0.45,
    flexDirection: 'column',
  },
  image_block_text_button: {
    width: width,
    paddingLeft:20,
    backgroundColor: "transparent",
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  image_block_text_big: {
    fontSize: 12,
    textAlign: "left"
  },
  image_block_text_small: {
    fontSize: 10,
    textAlign: "left"
  },
  header_text: {
    paddingLeft: 35
  },
  settings_btn: {
    height: 30,
    width: 30,
    alignSelf: 'center'
  },
  close_img: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },
  settings_img: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  info: {
    width: width,
    flexDirection: 'column',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  name: {
    color: colors.black,
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Rubik-Bold",
    letterSpacing: 2,
    marginBottom: height * 0.05
  },
  phone: {
    color: colors.black_o36,
    fontSize: 12,
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
  },
  btn_container: {
    width: width,
    height: height * 0.4,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center"
  },
  image_block_button: {
    paddingLeft: width * 0.05
  },
  button: {
    width: width,
    height: height * 0.12,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
  }
});