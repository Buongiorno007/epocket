import { StyleSheet, Dimensions, Platform } from "react-native"
const { width } = Dimensions.get("window")
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  video: {
    position: "absolute",
    width,
    height,
  },
})
