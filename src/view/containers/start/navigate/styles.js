import { StyleSheet, Dimensions, Platform } from "react-native"
import { colors } from "@constants/colors"

const { width } = Dimensions.get("window")

export default StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  button: {
    height: 44,
    marginVertical: 10,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0.2,
          height: 2,
        },
        shadowColor: "#000000",
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradient: {
    borderRadius: 22,
    height: 44,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.dark_pink,
  },
  sign_up: {
    color: "#fff",
  },
})
