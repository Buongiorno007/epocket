import React from "react"
import { AppRegistry, StatusBar } from "react-native"
import { Root } from "native-base"
import { createStackNavigator, createAppContainer } from "react-navigation"
import Wrapper from "@containers/application/wrapper"

import { Provider } from "react-redux"
import store from "./src/store"

import NavigationService from "./src/services/route"

console.disableYellowBox = true
console.ignoredYellowBox = ["Warning: ReactNative.createElement", "Require cycle: node_modules/rn-fetch-blob/index.js"]

const Navigator = createStackNavigator(
  {
    Start: { screen: require("@components/start").default },
    SignIn: { screen: require("@components/sign-in").default },
    SignUp: { screen: require("@components/sign-up").default },
    ConfirmCode: { screen: require("@components/confirm-code").default },
    CatCode: { screen: require("@components/catCode").default },
    Scanner: { screen: require("@components/scanner").default },
    Refill: { screen: require("@components/refill/root").default },
    RefillFinish: { screen: require("@components/refill/finish").default },
    Main: { screen: require("@components/main/main").default },
    Dashboard: { screen: require("@components/dashboard/dashboard").default },
    Photograph: { screen: require("@components/photograph/photograph").default },
    Photo: { screen: require("@components/photo/photo").default },
    QrCode: { screen: require("@components/qr-code/qr-code").default },
    Picture: { screen: require("@components/picture/picture").default },
    Trade: { screen: require("@components/trade").default },
    MissionSuccess: { screen: require("@components/mission-success/mission-success").default },
    EarnMore: { screen: require("@components/earn-more/earn-more").default },
    ProfileSettings: { screen: require("@components/profile-settings/profile-settings").default },
    Cashout: { screen: require("@components/cashout/cashout").default },
    Partners: { screen: require("@components/partners/partners").default },
    ProfEdit: { screen: require("@components/profile-edit/profileEdit").default },
    Gamee: { screen: require("@components/game-component/game").default },
    GameSuccess: { screen: require("@components/game-component/game-success").default },
    GameFailed: { screen: require("@components/game-component/game-failed").default },
    WalletInformation: require("@components/wallet/wallet-information").default,
    //MAIN
    // GameStart: { screen: require('@components/game-component/game-start').default },
    // Wallet: { screen: require('@components/wallet').default },
    // GamePartners: { screen: require('@components/game-component/game-partners').default },
    MapPlaces: require("@components/map/map-places").default,
    Filters: require("@components/filters").default,
    Barcode: require("@components/barcode").default,
    BasketComponent: require("@components/basket").default,
    Partnrs: require("@components/partners").default,
    StorePoint: require("@components/store").default,
    OrderScreen: require("@components/order").default,
    MallPoint: require("@components/mall").default,
    MallTask: require("@components/mallTask").default,
    TaskInProgress: require("./src/view/components/task-in-progress").default,
    MallProgressTask: require("./src/view/components/mall-progress-task").default,
  },
  {
    initialRouteName: "Start",
    defaultNavigationOptions: {
      headerTransparent: true,
      header: null,
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
)

const EpocketCash = createAppContainer(Navigator)

const App = () => (
  <Root>
    <Provider store={store}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} />
      <Wrapper>
        <EpocketCash ref={navigatorRef => NavigationService.setRoot(navigatorRef)} />
      </Wrapper>
    </Provider>
  </Root>
)

AppRegistry.registerComponent("EpocketCash", () => App)
