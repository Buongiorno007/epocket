import React from "react";
import BackgroundGeolocationModule from "./src/services/background-geolocation-picker";
import { sendToTelegramm } from "./src/services/telegramm-notification";
import { AppRegistry } from "react-native";
import { Root } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
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
import ProfileSettings from "./src/view/components/profile-settings/profile-settings";
import ProfileEdit from "./src/view/components/profile-edit/profile-edit";
import Game from "./src/view/components/game/game";
import GameResult from "./src/view/components/game-result/game-result";
import Cashout from "./src/view/components/cashout/cashout";
import Partners from "./src/view/components/partners/partners";

import { Provider } from "react-redux";
import store from "./src/store";

import NavigationService from "./src/services/route";

console.disableYellowBox = true;
console.ignoredYellowBox = ["Warning: ReactNative.createElement"];

const Navigator = createStackNavigator(
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
    Cashout: { screen: Cashout },
    Partners: { screen: Partners }
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      headerStyle: {
        display: "none"
      }
    },
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);

const EpocketCash = createAppContainer(Navigator);

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
