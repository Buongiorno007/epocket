// @ts-nocheck
import React from 'react'
import { StatusBar } from 'react-native'
import { Root } from 'native-base'
import Wrapper from 'containers/application/wrapper'
import route from 'services/route'
import AppContainer from './screens'
import { Provider } from 'react-redux'
import store from './store'

console.disableYellowBox = true
console.ignoredYellowBox = ['Warning: ReactNative.createElement']

const translucent = true
const barStyle = 'dark-content'
const backgroundColor = 'transparent'

export default class Application extends React.Component {
	render() {
		return (
			<Root>
				<Provider {...{ store }}>
					<StatusBar {...{ translucent, barStyle, backgroundColor }} />
					<Wrapper>
						<AppContainer ref={route.setRoot} />
					</Wrapper>
				</Provider>
			</Root>
		)
	}
}
