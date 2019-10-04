import { StyleSheet, Dimensions } from "react-native"
const { width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderColor: "rgba(177,177,177,0.3)",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  title: {
    fontFamily: "Rubik-Regular",
    color: "#111",
    fontSize: 14,
    flexGrow: 1,
  },
  viewPrice: {
    marginLeft: 16,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E60050",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontFamily: "Rubik-Regular",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  arrowView: {
    width: 15,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    width: 10,
    height: 10,
    marginTop: -6,
    borderColor: "rgba(177, 177, 177, 0.45)",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    transform: [{ rotate: "45deg" }],
  },
  activeArrow: {
    transform: [{ rotate: "180deg" }],
  },
  dropView: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#F8F8F8",
  },
  dropText: {
    fontFamily: "Rubik-Regular",
    color: "#111",
    fontSize: 10,
  },
})
