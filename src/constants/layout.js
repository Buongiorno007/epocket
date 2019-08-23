import { LayoutAnimation, Platform, UIManager } from 'react-native'

const expand = {
	duration: 200,
	create: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
	delete: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
}

export default animation = () => {
	if (Platform.OS === 'android') {
		UIManager.setLayoutAnimationEnabledExperimental(true)
	}
	LayoutAnimation.configureNext(expand)
}
