import React from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Feather'
//constants
import styles from './styles'
import { colors } from '../../../constants/colors_men'
import { ICONS } from '../../../constants/icons'
//services
import NavigationService from './../../../services/route'
//redux
import { loaderState } from '../../../reducers/loader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import I18n from '@locales/I18n'

class CashoutList extends React.Component {
	state = {
		count: this.props.item.count ? this.props.item.count : 0,
		currency: '',
	}
	item = this.props.item

	componentDidMount() {
		AsyncStorage.getItem('user_info').then((value) => {
			let object = JSON.parse(value)
			this.setState({ currency: object.currency })
		})
	}

	setItemCount = (count) => {
		this.props.loaderState(true)
		this.setState({ count }, () => {
			this.item.count = count
			if (count === 0) {
				this.deleteElement()
			} else {
				this.props.addItemToOrder(this.item)
			}
			this.props.loaderState(false)
		})
	}
	componentWillReceiveProps = (nextProps) => {}
	deleteElement = () => {
		this.props.deleteElem(this.item)
	}
	render = () => {
		return (
			<View style={styles.container}>
				<View style={styles.info}>
					<Button
						style={styles.button}
						transparent
						block
						rounded
						onPress={() =>
							NavigationService.navigate('Picture', {
								image: this.props.item.photo,
								copyOfCards: this.props.copyOfCards,
								general_info: this.props.general_info,
							})
						}
					>
						<FastImage
							resizeMode={FastImage.resizeMode.contain}
							source={{ uri: this.props.item.photo }}
							style={styles.photo}
						/>
					</Button>
					<View style={styles.title}>
						<Text numberOfLines={2} style={styles.text}>
							{this.props.item.name.toUpperCase()}
						</Text>
						<Text style={styles.text_epc}>
							{this.props.item.formated_price.amount} {I18n.t('EPC', { currency: this.state.currency })}
						</Text>
					</View>
				</View>
				<View style={styles.calculate}>
					<Button
						disabled={this.state.count === 0 ? true : false}
						rounded
						block
						transparent
						androidRippleColor={this.props.userColor.card_shadow}
						style={styles.calculate_button}
						onPress={() => this.setItemCount(--this.state.count)}
					>
						<FastImage
							style={styles.icon}
							resizeMode={FastImage.resizeMode.contain}
							source={{ uri: ICONS.COMMON.MINUS }}
						/>
					</Button>
					<Text style={styles.text_count}>{this.props.item.count ? this.props.item.count : 0}</Text>
					<Button
						disabled={this.state.count === this.props.item.amount ? true : false}
						rounded
						block
						transparent
						androidRippleColor={this.props.userColor.card_shadow}
						style={styles.calculate_button}
						onPress={() => this.setItemCount(++this.state.count)}
					>
						<FastImage
							style={styles.icon}
							resizeMode={FastImage.resizeMode.contain}
							source={{ uri: ICONS.COMMON.PLUS }}
						/>
					</Button>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	loader: state.loader,
})
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			loaderState,
		},
		dispatch,
	)
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CashoutList)
