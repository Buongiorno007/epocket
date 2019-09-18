import { StyleSheet, Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  task: {
    fontFamily: "Rubik-Bold",
    fontSize: 24,
    color: "#fff",
    marginTop: 24,
  },
  buttonActive: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 20,
    marginVertical: 24,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
    borderRadius: 20,
    marginVertical: 24,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: "#fff",
    textTransform: "uppercase",
  },
  buttonTextActive: {
    color: "#F63272",
  },
  scroll: {
    flex: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
})
