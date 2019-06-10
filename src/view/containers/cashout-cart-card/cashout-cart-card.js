import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button } from 'native-base'
//constants
import styles from './styles'
//services
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ICONS } from '../../../constants/icons'
import I18n from '@locales/I18n'

class CartCard extends React.Component {
	state = {
		count: 0,
		currency: '',
	}
	cardInfo = this.props.cardInfo
	componentDidMount() {
		this.setState({ currency: this.props.profileState.currency })
	}
	deleteElement = () => {
		this.props.deleteElem(this.cardInfo)
	}
	render = () => {
		return (
			<View style={styles.container}>
				<View style={styles.left_image_container}>
					<FastImage
						style={styles.left_image}
						resizeMode={FastImage.resizeMode.contain}
						source={{ uri: this.cardInfo.photo }}
					/>
				</View>
				<View style={styles.info}>
					<View style={styles.left_info}>
						<View style={styles.title_and_count}>
							<Text numberOfLines={1} style={styles.name_text}>
								{this.cardInfo.name.toUpperCase()}{' '}
							</Text>
							<Text numberOfLines={1} style={styles.count_text}>
								{' '}
								x {this.cardInfo.count}
							</Text>
						</View>
						<Text numberOfLines={1} style={styles.count_text}>
							Description in progress
						</Text>
					</View>
					<View style={styles.right_info}>
						<Text numberOfLines={1} style={styles.price_text}>
							{this.cardInfo.formated_price.amount} {I18n.t('EPC', { currency: this.state.currency })}
						</Text>
						<Button
							rounded
							block
							transparent
							androidRippleColor={this.props.userColor.card_shadow}
							style={styles.button_close}
							onPress={() => this.deleteElement()}
						>
							<FastImage
								style={styles.icon}
								resizeMode={FastImage.resizeMode.contain}
								source={{ uri: ICONS.COMMON.CLOSE }}
							/>
						</Button>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	profileState: state.profileState,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CartCard)
