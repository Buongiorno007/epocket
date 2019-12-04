module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				extensions: ['.ios.js', '.android.js', '.js', '.json'],
				alias: {
					assets: './src/assets',
					components: './src/view/components',
					constants: './src/constants',
					containers: './src/view/containers',
					locales: './src/locales',
					services: './src/services',
					reducers: './src/reducers',
				},
			},
		],
	],
}
