import { StyleSheet, Dimensions, Platform } from "react-native"
import { colors } from "@constants/colors"
const { width } = Dimensions.get("window")
import sbHeight from "@services/getSBHeight"
const { height } =
  Platform.OS === "android" && Platform.Version > 26 ? Dimensions.get("screen") : Dimensions.get("window")

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: Platform.OS === 'android' ? height - 48 : height,
    backgroundColor: "#F5F9FE",
  },
  content: {
    flex: 1,
    backgroundColor: "gray",
  },
  circles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: 120,
    zIndex: 0,
  },
  wallet: {
    // marginTop: 48,
    // marginBottom: 32,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  wallet_c: {
    borderRadius: 24,
    height: 120,
    marginHorizontal: 16,
    backgroundColor: colors.black111,
    marginTop: sbHeight + 16,
    justifyContent: "center",
  },
  wallet_p: {
    fontFamily: 'Rubik-Medium',
    textAlign: 'center', 
    color: colors.white, 
    fontSize: 12
  },
  history: {
    flex: 1,
    backgroundColor: "#F5F9FE",
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
    marginBottom: 60,
    paddingVertical: 16,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  date: {
    marginTop: 24,
    width: "100%",
  },
})
