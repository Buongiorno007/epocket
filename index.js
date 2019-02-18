import React from "react";
import BackgroundGeolocationModule from "./src/services/background-geolocation-picker"
import { sendToTelegramm } from './src/services/telegramm-notification'
import { AppRegistry } from "react-native";
import { Root } from "native-base";
import { createStackNavigator } from "react-navigation";
import Start from "./src/view/components/start/start";
import SignIn from "./src/view/components/sign-in/sign-in";
import Main from "./src/view/components/main/main";
import SignUp from "./src/view/components/sign-up/sign-up";
import Dashboard from "./src/view/components/dashboard/dashboard";
import Scanner from "./src/view/components/scanner/scanner";
import Photograph from "./src/view/components/photograph/photograph";
import Photo from "./src/view/components/photo/photo";
import QrCode from "./src/view/components/qr-code/qr-code";
import Picture from "./src/view/components/picture/picture";
import Trade from "./src/view/components/trade/trade";
import MissionSuccess from "./src/view/components/mission-success/mission-success";
import EarnMore from "./src/view/components/earn-more/earn-more";
import ProfileSettings from "./src/view/components/profile-settings/profile-settings"
import ProfileEdit from "./src/view/components/profile-edit/profile-edit"
import Game from "./src/view/components/game/game"
import GameResult from "./src/view/components/game-result/game-result"
import Cashout from "./src/view/components/cashout/cashout"

import { Provider } from "react-redux";
import store from "./src/store";

import NavigationService from "./src/services/route";

console.disableYellowBox = true;
console.ignoredYellowBox = ["Warning: ReactNative.createElement"];

const EpocketCash = createStackNavigator(
  {
    Start: { screen: Start },
    Main: { screen: Main },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    Dashboard: { screen: Dashboard },
    Scanner: { screen: Scanner },
    Photograph: { screen: Photograph },
    Photo: { screen: Photo },
    QrCode: { screen: QrCode },
    Picture: { screen: Picture },
    Trade: { screen: Trade },
    MissionSuccess: { screen: MissionSuccess },
    EarnMore: { screen: EarnMore },
    ProfileEdit: { screen: ProfileEdit },
    ProfileSettings: { screen: ProfileSettings },
    Game: { screen: Game },
    GameResult: { screen: GameResult },
    Cashout: { screen: Cashout }
  },
  {
    initialRouteName: "Start",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);
BackgroundGeolocationModule.ready({
  // Geolocation Config
  desiredAccuracy: BackgroundGeolocationModule.DESIRED_ACCURACY_HIGH,
  distanceFilter: 10,
  // Activity Recognition
  stopTimeout: 1,
  // Application config
  debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
  logLevel: BackgroundGeolocationModule.LOG_LEVEL_VERBOSE,
  stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
  startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
  // HTTP / SQLite config
  url: 'http://yourserver.com/locations',
  batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
  headers: {              // <-- Optional HTTP headers
    "X-FOO": "bar"
  },
  params: {               // <-- Optional HTTP params
    "auth_token": "maybe_your_server_authenticates_via_token_YES?"
  }
}, (state) => {
  console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

  if (!state.enabled) {
    ////
    // 3. Start tracking!
    //
    BackgroundGeolocationModule.start(function () {
      console.log("- Start success");
    });
  }
});
//BackgroundGeolocationModule.on('location', (location) => sendToTelegramm('epc location : ' + JSON.stringify(location)));

const App = () => (
  <Root>
    <Provider store={store}>
      <EpocketCash
        ref={navigatorRef => NavigationService.setRoot(navigatorRef)}
      />
    </Provider>
  </Root>

);

AppRegistry.registerComponent("EpocketCash", () => App);
