import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./../../../constants/colors";

const { width, height } = Dimensions.get("window");

let template_size = width * 0.33;
let image_size = template_size - 5;

export default StyleSheet.create({
  container: {
    height : template_size,
    width : template_size,
    position : 'relative'
  },
  template: {
    position : 'absolute',
    top : 0,
    left : 0,
    height : image_size,
    width : image_size,
    zIndex : 1,
  }, 
  template_image : {
    height : image_size,
    width : image_size,
  },
  back_view: {
    position : 'absolute',
    bottom : 0,
    right : 0,
    height : image_size,
    width : image_size,
    zIndex : 0,
    backgroundColor : colors.drag_panel_color
  },
});
