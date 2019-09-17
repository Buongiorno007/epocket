import { StyleSheet, Dimensions } from "react-native"
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
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Rubik-Regular",
  },
  withModal: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#E5EDF7",
  },
})
