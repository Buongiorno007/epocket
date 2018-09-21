import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  main: {
    top: 0,
    left: 0,
    right: 0,
    height: height,
    width: width,
    backgroundColor: colors.drag_panel_color,
    flexDirection: 'column',
    justifyContent: "flex-start",
    paddingTop: height * 0.1
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
    width: width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 10,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
  },

  photo_container: {
    width: width * 0.4,
    height: width * 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: 'center',
  },
  btn_container: {
    height: 100,
    bottom: 40,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2
  },

  btn: {
    zIndex: 1
  },
  text_container_item: {
    width: width * 0.75,
  },
  text_container_input: {
    fontSize: 14,
    fontFamily: "Rubik-Regular"
  },
  text_container_label: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: "Rubik-Regular"
  },
  keyboard_avoid_view: {
    flex: 1,
    width: width
  },

  text_container: {
    width : width - (width * 0.2),
    height : height * 0.4,
    flexDirection : 'column'
  },
  name: {
    color: colors.black,
    fontSize: 22,
    textAlign: "left",
    fontFamily: "Rubik-Bold",
    letterSpacing: 2,
  },
  common: {
    color: colors.black_o36,
    fontSize: 12,
    textAlign: "left",
    fontFamily: "Rubik-Regular",
  }, 
  title: {
    color: colors.black_o36,
    fontSize: 15,
    textAlign: "left",
    fontFamily: "Rubik-Regular",
  },
  sex_picker : {
    width : width - (width * 0.2),
    height : 20,
    flexDirection : 'row'
  },
  sex_btn : {
    height : 20,
  }
});
