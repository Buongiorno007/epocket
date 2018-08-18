import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  photo_container: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5
  },
  photo: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2
    //resizeMode : 'contain'
  }
});
