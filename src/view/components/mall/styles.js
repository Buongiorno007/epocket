import { StyleSheet, Dimensions } from "react-native"
import { colors } from "@constants/colors"
import colors_men from "../../../constants/colors_men"
const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: width * 0.8,
  },
  opacity: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginBottom: 4,
  },
  subtitle: {
    color: colors.black111,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Rubik-Regular",
  },
  withModal: {
    flex: 1,
    // marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    width: width - 32,
    height: (width - 32) * 0.55,
    marginHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
  },
  renderBlockText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 15,
    color: colors.black111,
    marginBottom: 8, 
    paddingHorizontal: 16
  },
  renderBlockElement: {
    backgroundColor: "white", 
    marginHorizontal: 16,
    // marginVertical: 8,
    // borderWidth: 1,
    // borderColor: colors.gray_e6,
    // borderRadius: 12,
    // overflow: 'hidden'
  }
})
