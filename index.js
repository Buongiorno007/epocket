import React from "react";
import { AppRegistry } from "react-native";
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
import Profile from "./src/view/components/profile/profile"
import ProfileEdit from "./src/view/components/profile-edit/profile-edit"

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
    ProfileEdit: { screen: ProfileEdit }
  },
  {
    initialRouteName: "Start",
    navigationOptions: {
      gesturesEnabled: false,
      header: null
    }
  }
);

const App = () => (
  <Provider store={store}>
    <EpocketCash
      ref={navigatorRef => NavigationService.setRoot(navigatorRef)}
    />
  </Provider>
);

AppRegistry.registerComponent("EpocketCash", () => App);
