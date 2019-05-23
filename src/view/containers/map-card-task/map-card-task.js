import React from 'react'
import { View, Text, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from 'native-base'
//constants
import styles from './styles'
import { colors } from '../../../constants/colors'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import I18n from '@locales/I18n'

class CardTask extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currency: '',
		}
	}
	componentDidMount() {
		AsyncStorage.getItem('user_info').then((value) => {
			let object = JSON.parse(value)
			this.setState({ currency: object.currency })
		})
	}

	_onPress = () => {
		this.props.onPressItem(this.props.item)
	}

	_keyExtractor = (item, index) => String(item.id)

	render() {
		return (
			<Button
				style={[
					styles.card,
					Platform.OS === 'android' && {
						borderTopWidth: 1,
						borderTopColor: 'rgba(217, 221, 224, 0.5)',
					},
				]}
				onPress={this._onPress}
			>
				<View style={styles.inner_conainer}>
					<View style={styles.name_container}>
						<Text style={styles.name} numberOfLines={3}>
							{this.props.item.trade}
						</Text>
					</View>
					<Text style={styles.price} numberOfLines={1}>
						{this.props.item.formated.amount} {I18n.t('EPC', { currency: this.state.currency })}
					</Text>
					<View style={styles.bottom_container}>
						<Text style={styles.time_text} numberOfLines={1}>
							{I18n.t('MAP.WILL_BE_ACTIVE')}
						</Text>
						<Text style={styles.time_range} numberOfLines={1}>
							{this.props.item.date_start.substring(10, 16)} -{' '}
							{this.props.item.date_end.substring(10, 16)}
						</Text>
					</View>
				</View>
			</Button>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CardTask)
