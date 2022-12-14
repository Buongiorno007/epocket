import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image, View, FlatList, Modal, StatusBar, Platform } from 'react-native'
import { Header } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import { colors } from '@constants/colors'
import I18n from '@locales/I18n'

export default class SignForm extends Component {
	state = {
		imgUri: '',
		codeValue: '',
		visible: true,
		top: 0,
		width: 0,
		activeIndex: null,
		mask: '99 999 99 99',
		placeholder: '-- --- -- --',
	}

	componentDidMount() {
		if (this.props.data.length > 0) {
			const { phone_code, flag, phone_mask } = this.props.data[0]
			this.setState({
				codeValue: phone_code || '',
				imgUri: flag || '',
				activeIndex: 0,
				mask: phone_mask.replace(/-/g, '9') || '99 999 99 99',
				placeholder: phone_mask || '-- --- -- --',
			})
			this.props.setCode(phone_code || '')
			this.props.maskLength(phone_mask.length || 12)
		}
	}

	renderItem = (item) => (
		<TouchableOpacity
			style={item.index === this.state.activeIndex ? styles.activeItem : styles.item}
			onPress={() => {
				this.setState({
					visible: false,
					codeValue: item.item.phone_code,
					imgUri: item.item.flag,
					activeIndex: item.index,
					mask: item.item.phone_mask.replace(/-/g, '9'),
					placeholder: item.item.phone_mask,
				})
				this.props.setCode(item.item.phone_code)
				this.props.maskLength(item.item.phone_mask.length)
			}}
		>
			<Image style={styles.imgStyle} source={{ uri: item.item.flag }} />
			<Text style={{ flexGrow: 1, color: '#404140', fontSize: 14 }}>{I18n.t(`COUNTRY.${item.item.code}`)}</Text>
			<Text style={{ color: 'rgba(64, 65, 64, .55)', fontSize: 14 }}>{item.item.phone_code}</Text>
		</TouchableOpacity>
	)

	render() {
		return (
			<View
				style={styles.cont}
				onLayout={(event) => {
					const { y, width } = event.nativeEvent.layout
					this.setState({ top: y, width: width })
				}}
			>
				<View style={styles.viewInput}>
					<TouchableOpacity style={styles.choseCountry} onPress={() => this.setState({ visible: true })}>
						<Image style={styles.imgStyle1} source={{ uri: this.state.imgUri }} />
						<Text style={styles.resultText}>{this.state.codeValue} </Text>
						<View style={styles.triangular} />
					</TouchableOpacity>
					<TextInputMask
						style={styles.textInput}
						value={this.props.value}
						keyboardType={'numeric'}
						onChangeText={(value) => this.props.setPhoneNumber(value)}
						type={'custom'}
						options={{
							mask: this.state.mask,
						}}
						maxLength={this.state.mask.length}
						placeholder={this.state.placeholder}
						placeholderTextColor={colors.black111}
						onFocus={() => this.props.onFocus()}
					/>
					{this.props.children}
				</View>
				<Modal visible={this.state.visible} transparent={true} onRequestClose={() => {this.setState({ visible: false })}}>
					<View
						style={styles.overlay}
						onStartShouldSetResponder={() => true}
						onResponderRelease={() => this.setState({ visible: true })}
					>
						<View
							style={[{
								top: Platform.OS === 'ios' ? this.state.top + 68 + Header.HEIGHT : this.state.top + 90,
								width: this.state.width,
								marginHorizontal: 16,
								maxHeight: 192,
								backgroundColor: '#fff',
							}, styles.shadow]}
						>
							<FlatList
								data={this.props.data}
								renderItem={this.renderItem}
								scrollEnabled={this.props.data.length > 4}
								keyExtractor={(item) => item.phone_code + item.code}
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
		// position: 'relative',
		width: '100%',
	},
	choseCountry: {
		width: 90,
		display: 'flex',
		flexDirection: 'row',
		borderBottomColor: colors.black111,
		borderBottomWidth: 1,
		paddingVertical: 8,
		marginRight: 16,
		alignItems: 'center',
	},
	resultText: {
		color: colors.black111,
		textAlign: 'right',
		flexGrow: 1,
		fontSize: 16,
	},
	textInput: {
		flexGrow: 1,
		borderBottomColor: colors.black111,
		borderBottomWidth: 1,
		color: colors.black111,
		paddingVertical: Platform.OS === 'ios' ? 8 : 5,
		fontSize: 16,
	},
	imgStyle: {
		width: 24,
		height: 18,
		marginRight: 16,
	},
	imgStyle1: {
		width: 24,
		height: 18,
		marginRight: 8,
	},
	viewInput: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	triangular: {
		marginLeft: 8,
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderTopWidth: 5,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: colors.black111,
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
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
	},
	activeItem: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 16,
		paddingHorizontal: 16,
		backgroundColor: '#EEEEEE',
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
	shadow: {
		...Platform.select({
			ios: {
			  shadowOpacity: 0.2,
			  shadowOffset: {
				width: 0.2,
				height: 2,
			  },
			  shadowColor: colors.pink_shadow,
			  shadowRadius: 2,
			},
			android: {
			  elevation: 4,
			},
		  }),
	}
})
