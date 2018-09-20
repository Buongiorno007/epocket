import { Platform } from 'react-native'
import * as AndroidBackgroundGeolocation from "react-native-mauron85-background-geolocation"; 
import * as IOSBackgroundGeolocation from "react-native-background-geolocation"; 
const BackgroundGeolocationModule = Platform.OS==="ios" ? IOSBackgroundGeolocation.default : AndroidBackgroundGeolocation
export default BackgroundGeolocationModule