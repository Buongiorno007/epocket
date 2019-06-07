import React from 'react'
import { View, Text, Platform } from 'react-native'
import { Button } from 'native-base'
import FastImage from 'react-native-fast-image'
//constants
import styles from './styles'
import { colors } from '../../../constants/colors'
import { ICONS } from './../../../constants/icons'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import I18n from '@locales/I18n'

class LongCard extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		currency: '',
	}
	componentDidMount() {
		this.setState({ currency: this.props.profileState.currency })
	}

	_onPress = () => {
		this.props.onPressItem(this.props.item)
	}
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
				<FastImage
					resizeMode={FastImage.resizeMode.contain}
					style={styles.social_icon}
					source={{
						uri:
							this.props.item.type === 'instagram_connect' ? ICONS.INSTAGRAM_COLOR : ICONS.FACEBOOK_COLOR,
					}}
				/>
				<View style={styles.social_text_container}>
					<View style={styles.social_text_container_inner}>
						<Text style={styles.social_text}>{I18n.t('DASHBOARD_LIST.CONNECT')}</Text>
						<Text style={styles.social_text_big}>
							{this.props.item.type === 'instagram_connect' ? I18n.t('INSTAGRAM') : I18n.t('FACEBOOK')}
						</Text>
					</View>
					<Text style={styles.social_text}>
						{I18n.t('DASHBOARD_LIST.ACCOUNT_AND_GET') +
							' 10 ' +
							I18n.t('EPC', { currency: this.state.currency })}
					</Text>
				</View>
				<Button rounded transparent block style={styles.arrow_cont} onPress={this._onPress}>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						style={styles.arrow}
						source={require('../../../assets/img/arrow_down.png')}
					/>
				</Button>
			</Button>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
	timer: state.timer,
	timer_status: state.timer_status,
	profileState: state.profileState,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LongCard)
