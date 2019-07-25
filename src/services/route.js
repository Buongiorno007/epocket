/** @flow */
import { Alert, BackHandler } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import I18n from '@locales/I18n'

let navigation

function setRoot(navigatorRef: any) {
	navigation = navigatorRef
}

function navigate(url: string, params: any = undefined) {
	navigation.dispatch(
		StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ key: url, routeName: url, params })],
		}),
	)
}

function push(url, params = undefined) {
	navigation.dispatch(
		StackActions.push({
			routeName: url,
			params: params,
		}),
	)
}

function pop(n = 1) {
	navigation.dispatch(
		StackActions.pop({
			n: n,
		}),
	)
}

function goBackPress(url: string, params: any = undefined) {
	BackHandler.addEventListener('hardwareBackPress', (): any => {
		navigate(url, params)
		return true
	})
}

function exit() {
	BackHandler.addEventListener('hardwareBackPress', () => {
		const { nav } = navigation.state
		if (nav.index === 0) {
			Alert.alert(
				I18n.t('TITLE'),
				I18n.t('EXIT'),
				[
					{ text: I18n.t('CANCEL'), onPress: () => {} },
					{ text: I18n.t('OK'), onPress: (): any => BackHandler.exitApp() },
				],
				{ cancelable: false },
			)
			return true
		}
	})
}

export default {
	exit,
	navigate,
	push,
	pop,
	goBackPress,
	setRoot,
}
