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
    Start: require("@components/start").default,
    SignIn: require("@components/authentication/sign-in").default,
    SignUp: require("@components/authentication/sign-up").default,
    ConfirmCode: require("@components/authentication/confirm-code").default,
    CatCode: require("@components/authentication/catCode").default,
    // Main: require("@components/main/main").default,
    Main: require("@components/main/newmain/newmain").default,
    // Scanner: { screen: require("@components/mall/scanner").default },
    Refill: { screen: require("@components/map/map-spend/refill/root").default },
    RefillFinish: { screen: require("@components/map/map-spend/refill/finish").default },
    // Dashboard: { screen: require("@components/dashboard/dashboard").default },
    // Photograph: { screen: require("@components/photograph/photograph").default },
    // Photo: { screen: require("@components/photo/photo").default },
    // QrCode: { screen: require("@components/qr-code/qr-code").default },
    // Picture: { screen: require("@components/picture/picture").default },
    // Trade: { screen: require("@components/trade").default },
    // MissionSuccess: { screen: require("@components/mall/mission-success/mission-success").default },
    // EarnMore: { screen: require("@components/earn-more/earn-more").default },
    ProfileSettings: { screen: require("@components/profile/profile-settings/profile-settings").default },
    // Cashout: { screen: require("@components/cashout/cashout").default },
    // Partners: { screen: require("@components/partners/partners").default },
    ProfEdit: { screen: require("@components/profile/profile-edit/profileEdit").default },
    Gamee: { screen: require("@components/game-component/game").default },
    GameSuccess: { screen: require("@components/game-component/game-success").default },
    GameFailed: { screen: require("@components/game-component/game-failed").default },
    Wallet: require("@components/wallet").default,
    Gamepage: require("@components/map").default,
    //MAIN
    // GameStart: { screen: require('@components/game-component/game-start').default },
    // Wallet: { screen: require('@components/wallet').default },
    // GamePartners: { screen: require('@components/game-component/game-partners').default },
    MapPlaces: require("@components/map/map-places").default,
    Filters: require("@components/filters").default,
    Barcode: require("@components/map/map-spend/barcode").default,
    BasketComponent: require("@components/basket").default,
    Partnrs: require("@components/map/map-spend/partners").default,
    StorePoint: require("@components/store").default,
    OrderScreen: require("@components/map/map-spend/order").default,
    MallPoint: require("@components/mall").default,
    MallTask: require("@components/mall/mallTask").default,
    // TaskInProgress: require("@components/mall/task-in-progress").default,
    MallProgressTask: require("@components/mall/mall-progress-task").default,
    WalletInformation: require("@components/wallet/wallet-information").default,
    Receipt: require("@components/wallet/wallet-information/receipt").default,
    AddAdvert: require("@components/profile/referals/add-advert").default,
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
