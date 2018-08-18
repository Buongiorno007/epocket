import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  size: {
    width: width * 0.7
  },
  preview: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  camera: {
    backgroundColor: "#fff",
    marginTop: width * 0.1,
    flex: 2,
    borderWidth: 1,
    borderColor: "rgba(143, 163, 191, 1)",
    elevation: 15,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5
  },
  settings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  photo_button: {
    width: width * 0.7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    justifyContent: "center",
    alignItems: "center"
  },
  button_circle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1
  },
  icon_circle: {
    color: "#000",
    fontSize: width * 0.16
  },
  icon_refresh: {
    color: "rgba(127, 121, 137, 1)",
    fontSize: 28
  },
  icon_flash: {
    width: width * 0.065,
    height: width * 0.065
  }
});
