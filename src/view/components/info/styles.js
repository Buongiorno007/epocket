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
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 80,
  },

  video_player_view: {
    position: "absolute",
    zIndex: 10,
    width: width,
    height: height
  },
  gradient: {
    width: width,
    paddingBottom : 280,
    paddingTop : 260,
    paddingLeft : 25,
    paddingRight : 25,
  },
  scroll : {
    position : 'absolute',
    top : 0,
    bottom : 0,
    height: height+400,
    width: width,
    marginTop : -200,

  },
  info_title : {
    color : '#fff',
    fontSize : 14,
    fontFamily : 'Rubik-Regular',
    lineHeight : 20,
  }
});
