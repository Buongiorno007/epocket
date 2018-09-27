import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { colors } from "../../../constants/colors";

const photo_size = width * 0.3;
const def_icon_size = width * 0.15;

export default StyleSheet.create({
  custom_photo: {
    position: 'relative',
    width: photo_size,
    height: photo_size,
    zIndex : 1,
  },
  photo_container: {
    width: photo_size,
    height: photo_size,
    borderRadius: photo_size / 2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.card_shadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 5,
    overflow: 'hidden',
    zIndex : 1,
  },
  photo: {
    width: photo_size,
    height: photo_size,
    borderRadius: photo_size / 2,
  },
  icon: {
    width: def_icon_size,
    height: def_icon_size,
  },
  edit_photo_btn: {
    position : 'absolute',
    left : 0,
    right :0,
    bottom : 0,
    width: 30,
    height: 30, 
    zIndex : 2,
    alignItems : 'center',
    justifyContent : 'center',

  },
  edit_photo_container: {
    width: 20,
    height: 20, 
    borderRadius : 10,
    backgroundColor: colors.pink,
    alignItems : 'center',
    justifyContent : 'center',

  },
  edit_photo_background : {
    width: 18,
    height: 18, 
    borderRadius : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: colors.drag_panel_color,

  },
  edit_photo_img: {
    fontSize : 15,
    lineHeight : 18,
    textAlign : 'center',
    color : colors.pink,
    alignItems : 'center',
    justifyContent : 'center',
  }
});
