import { Platform } from 'react-native'
import * as AndroidBackgroundGeolocation from "react-native-mauron85-background-geolocation"; 
import * as IOSBackgroundGeolocation from "react-native-background-geolocation"; 
console.log("AndroidBackgroundGeolocation",AndroidBackgroundGeolocation)
console.log("IOSBackgroundGeolocation",IOSBackgroundGeolocation)
const BackgroundGeolocationModule = Platform.OS==="ios" ? IOSBackgroundGeolocation.default : AndroidBackgroundGeolocation
export default BackgroundGeolocationModule