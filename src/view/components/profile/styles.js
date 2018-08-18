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
  header: {
    flex: 1,
    marginTop: 45,
    alignItems: "flex-end"
  },
  info: {
    flex: 7
  },
  info_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Rubik-Bold",
    letterSpacing: 2,
    marginBottom: height * 0.02
  },
  phone: {
    color: colors.black_o60,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Rubik-Regular"
  },
  photo: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  photo_container: {
    flex: 2
  },
  text_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn_container: {
    flex: 1,
    marginBottom: height * 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  header_container: {
    width : width,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  exit_container: {
    justifyContent: "center",
    alignItems: "center",
    width : 60,
    height : 30,
    borderRadius : 50,
    backgroundColor : colors.card_shadow,
    position : 'absolute',
    right : 20 
  },
  exit_btn: {
    justifyContent: "center",
    alignItems: "center",
    width : 58,
    height : 28,
    backgroundColor : colors.white,
    left : 1
  },
  exit_btn_text: {
    color: colors.card_shadow,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
  }
});
