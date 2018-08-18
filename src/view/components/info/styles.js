import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

export default StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: height,
    width: width,
    backgroundColor: colors.pink
  },
  back_view : {
    height: height,
    width: width,
    position : 'absolute',
    backgroundColor: colors.pink
  },
  back_img : {
    position : 'absolute',
    height: height,
    width: width,
  },

  logo_view: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: "contain"
  },
  awesome_button: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  video_player_view: {
    position: "absolute",
    zIndex: 10,
    width: width,
    height: height
  },
  gradient: {
    width: width,
    height: height,
    position: "absolute"
  }
});
