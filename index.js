import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import Application from './src/application'

AppRegistry.registerComponent(appName, () => Application)
