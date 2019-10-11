import { StyleSheet, Dimensions } from "react-native"
import sbHeight from "@services/getSBHeight"
import { colors } from '@constants/colors'

const { width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    width,
    height: 56 + sbHeight,
    paddingTop: sbHeight,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  button: {
    width: (width - 48) / 2,
    height: 40,
    marginBottom: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black111,
    borderRadius: 20,
    // alignItems: 'center',
    justifyContent: "center",
  },
  button_active: {
    borderWidth: 0,
    backgroundColor: colors.blood_red,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
  },
  text: {
    fontSize: 15,
    position: "absolute",
    alignSelf: "center",
    color: colors.black111,
    fontFamily: "Rubik-Regular",
  },
  text_active: {
    fontFamily: "Rubik-Medium",
    color: colors.white,
  },
})
