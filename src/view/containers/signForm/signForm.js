import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image, View, FlatList, Modal, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
// import TextInputMask from 'react-native-text-input-mask'
// import { TextInputMask } from 'react-native-masked-text'

export default class SignForm extends Component {
	state = {
		imgUri: '',
		codeValue: '',
		visible: false,
		top: 0,
		width: 0,
		activeIndex: null,
	}

	componentDidMount() {
		this.setState({
			codeValue: this.props.data[0].code || '',
			imgUri: this.props.data[0].icon || '',
			activeIndex: 0,
		})
	}

	blur = () => {
		this.setState({ visible: false })
	}

	renderItem = (item) => {
		return (
			<TouchableOpacity
				style={item.index === this.state.activeIndex ? styles.activeItem : styles.item}
				onPress={() => {
					this.setState({
						visible: false,
						codeValue: item.item.code,
						imgUri: item.item.icon,
						activeIndex: item.index,
					}),
						this.props.setCode(item.item.code)
				}}
			>
				<Image style={styles.imgStyle} source={{ uri: item.item.icon }} />
				<Text>{item.item.country}</Text>
				<Text>{item.item.code}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View
				style={styles.cont}
				onLayout={(event) => {
					const layout = event.nativeEvent.layout
					this.setState({ top: layout.y, width: layout.width })
				}}
			>
				<View style={styles.viewInput}>
					<TouchableOpacity style={styles.choseCountry} onPress={() => this.setState({ visible: true })}>
						{this.state.imgUri && (
							<Image
								style={styles.imgStyle}
								source={{
									uri: this.state.imgUri,
								}}
							/>
						)}
						<Text style={styles.resultText}>{this.state.codeValue}</Text>
					</TouchableOpacity>
					{/* <TextInputMask
						style={styles.textInput}
						value={this.props.value}
						keyboardType={'numeric'}
						onChangeText={(value) => this.props.setPhoneNumber(value)}
						mask={'[00] [000] [00] [00]'}
						placeholder={'-- --- -- --'}
						placeholderTextColor={'#fff'}
					/> */}
				</View>
				<Modal visible={this.state.visible} transparent={true}>
					<View
						style={styles.overlay}
						onStartShouldSetResponder={() => true}
						onResponderRelease={() => this.setState({ visible: false })}
					>
						<View
							style={{
								top:
									Platform.OS === 'ios'
										? this.state.top + 49 + Header.HEIGHT
										: this.state.top + 49 + Header.HEIGHT + StatusBar.currentHeight,
								width: this.state.width,
								marginHorizontal: 25,
								maxHeight: 192,
								backgroundColor: '#fff',
							}}
						>
							<FlatList
								data={this.props.data}
								renderItem={this.renderItem}
								scrollEnabled={this.props.data.length > 4}
								keyExtractor={(item) => item.id}
							/>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	cont: {
		marginVertical: 10,
		position: 'relative',
		width: '100%',
		zIndex: 900,
	},
	choseCountry: {
		width: '25%',
		display: 'flex',
		flexDirection: 'row',
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		paddingVertical: 10,
		marginRight: 15,
		// justifyContent: 'space-between'
	},
	textInput: {
		width: '100%',
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
		color: '#FFF',
	},
	imgStyle: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
	},
	resultText: {
		color: '#fff',
	},
	viewInput: {
		display: 'flex',
		flexDirection: 'row',
	},
	scrollView: {
		width: '100%',
		height: 192,
		zIndex: 100,
	},
	item: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 15,
		backgroundColor: '#FFFFFF',
	},
	activeItem: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 15,
		backgroundColor: '#EEEEEE',
	},
	baasdasad: {
		backgroundColor: 'blue',
		width: '100%',
		height: 200,
	},
	touchOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'yellow',
		zIndex: 999,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
})
