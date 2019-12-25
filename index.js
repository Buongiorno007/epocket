import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import Application from './src/application'
import bgActions from './src/bgActions'

AppRegistry.registerComponent(appName, () => Application)

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => bgActions);