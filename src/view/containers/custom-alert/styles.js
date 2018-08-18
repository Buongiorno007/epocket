import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";
const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    zIndex: 99,
  },
  blur_img: {
    flex: 1,
    width: width,
    height: height,
    position: "absolute"
  },
  cross: {
    width: 15,
    height: 15
  },
  cross_button: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  cross_view: {
    position : 'absolute',
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    width: 45,
    height: 45,
  },
  content_inner: {
    paddingTop : 15,
    height: 150,
    width: width * 0.76,
    borderRadius: 7,
    backgroundColor: colors.white
  },
  modal_title_text: {
    color: colors.black,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    flexWrap: "wrap",
    flex: 1,
    maxWidth: width * 0.76
  },
  alert_text: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: colors.black
  },
  modal_title: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  modal_buttons: {
    height: 50,
    width: width * 0.76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  big_centered_button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    width: width * 0.76,
    height: 50,
    borderTopColor: colors.card_shadow,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden"
  },
  fisrt_small_btn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: (width * 0.76) / 2 + 1,
    height: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 1,
    borderColor: colors.card_shadow,
    borderRightWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    overflow: "hidden"
  },
  second_small_btn: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: (width * 0.76) / 2 - 1,
    height: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopWidth: 1,
    borderColor: colors.card_shadow,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    overflow: "hidden"
  }
});
export default styles;
