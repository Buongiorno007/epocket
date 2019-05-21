import React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Root } from 'native-base'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Provider } from 'react-redux'
import store from './src/store'

import NavigationService from './src/services/route'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: ReactNative.createElement', 'Require cycle: node_modules/rn-fetch-blob/index.js']

const Navigator = createStackNavigator(
	{
		Start: { screen: require('@components/start/start').default },
		Main: { screen: require('@components/main/main').default },
		SignIn: { screen: require('@components/sign-in/sign-in').default },
		SignUp: { screen: require('@components/sign-up/sign-up').default },
		Dashboard: { screen: require('@components/dashboard/dashboard').default },
		Scanner: { screen: require('@components/scanner/scanner').default },
		Photograph: { screen: require('@components/photograph/photograph').default },
		Photo: { screen: require('@components/photo/photo').default },
		QrCode: { screen: require('@components/qr-code/qr-code').default },
		Picture: { screen: require('@components/picture/picture').default },
		Trade: { screen: require('@components/trade/trade').default },
		MissionSuccess: { screen: require('@components/mission-success/mission-success').default },
		EarnMore: { screen: require('@components/earn-more/earn-more').default },
		ProfileEdit: { screen: require('@components/profile-edit/profile-edit').default },
		ProfileSettings: { screen: require('@components/profile-settings/profile-settings').default },
		Game: { screen: require('@components/game/game').default },
		GameResult: { screen: require('@components/game-result/game-result').default },
		Cashout: { screen: require('@components/cashout/cashout').default },
		Partners: { screen: require('@components/partners/partners').default },
		RefillMobile: { screen: require('@components/refillMobile/refillMobile').default },
		Login: { screen: require('@components/sign-in/login').default },
		Registration: { screen: require('@components/sign-up/registration').default },
	},
	{
		initialRouteName: 'Start',
		defaultNavigationOptions: {
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
			<StatusBar barStyle='dark-content' translucent={true} backgroundColor={'transparent'} />
			<EpocketCash ref={(navigatorRef) => NavigationService.setRoot(navigatorRef)} />
		</Provider>
	</Root>
)

AppRegistry.registerComponent('EpocketCash', () => App)
