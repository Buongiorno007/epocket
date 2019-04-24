import { Alert, BackHandler } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

let navigation;

function setRoot(navigatorRef) {
  navigation = navigatorRef;
}

function navigate(url, params = undefined) {
  setTimeout(() => {
    let navigationAction;
    navigationAction = { key: url, routeName: url, params: params };
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate(navigationAction)]
      })
    );
  }, 200);
}

function goBackPress(url, params = {}) {
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigate(url, params);
    return true;
  });
}

function exit() {
  doubleClick = 0;
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (doubleClick == 0) {
      doubleClick = 1;
      setTimeout(() => {
        doubleClick = 0;
      }, 200);
      return true;
    } else if (doubleClick == 1) {
      Alert.alert(
        "EpocketCash",
        "Вы хотите выйти из приложения?",
        [
          { text: "Cancel", onPress: () => void 0 },
          { text: "OK", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      doubleClick == 0;
      return true;
    }
  });
}

export default {
  exit,
  navigate,
  goBackPress,
  setRoot
};
