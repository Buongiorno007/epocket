import { StyleSheet } from "react-native"
import colors_men from "../../../../constants/colors_men";
import { colors } from "@constants/colors"

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
    backgroundColor: "#E60050",
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
    borderColor: "#E60050",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    color: "#E60050",
    textTransform: "uppercase",
  },
  buttonTextActive: {
    color: "#fff",
  },
  scroll: {
    flex: 1,
    borderColor: "rgba(177,177,177,0.3)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  timeTaskContainer: {
    borderColor: "rgba(177,177,177,0.3)",
    borderTopWidth: 1,
    marginHorizontal: 16,
  },
  timeTaskHeaderText: {
    fontFamily: 'Rubik-Mediun',
    fontSize: 16,
    color: colors.black111,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeTaskNormalText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: colors.black111,
  },
  timeTaskBoldText:{
    fontFamily: 'Rubik-Mediun',
    fontSize: 12,
    color: colors.black111,
    fontWeight: 'bold',
  },
  none: {
    display: 'none',
  }
})
