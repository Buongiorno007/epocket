import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Label, Button } from 'native-base'
//constants
import styles from './styles'
//redux
import { setTabState } from '@reducers/tabs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loaderState } from '@reducers/loader'
import I18n from '@locales/I18n'
import { colors } from '@constants/colors'

class FooterNavigation extends React.Component {
	render() {
		return (
			<View style={[styles.footer_container, this.props.activeTab === 0 && styles.bTop]}>				
				<Button
					transparent
					style={[styles.footer_tab]}
					onPress={() => {
						this.props.setTabState(0)
					}}
				>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						style={this.props.activeTab === 0 ? styles.footer_tab_icon_active : styles.footer_tab_icon}
						source={
							this.props.activeTab === 0
								? require('@assets/img/earn_active.png') 
								: require('@assets/img/earn_default.png') 
						}
					/>
						<Label style={[styles.footer_tab_text, this.props.activeTab === 0 && {color: colors.blood_red}]}> {I18n.t('NAVIGATION.EARN')} </Label>
				</Button>
				<Button
					transparent
					style={[styles.footer_tab]}
					onPress={() => {
						this.props.setTabState(1)
					}}
				>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						style={this.props.activeTab === 1 ? styles.footer_tab_icon_active : styles.footer_tab_icon}
						source={
							this.props.activeTab === 1
							? require('@assets/img/bag_active.png') 
							: require('@assets/img/bag_default.png') 
						}
					/>
						<Label style={[styles.footer_tab_text, this.props.activeTab === 1 && {color: colors.blood_red}]}> {I18n.t('NAVIGATION.BUY')} </Label>
				</Button>
				<Button
					transparent
					style={[styles.footer_tab]}
					onPress={() => {
						this.props.setTabState(2)
					}}
				>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						style={this.props.activeTab === 2 ? styles.footer_tab_icon_active : styles.footer_tab_icon}
						source={
							this.props.activeTab === 2
								? require('@assets/img/wallet_active.png') 
								: require('@assets/img/wallet_default.png') 
						}
					/>
						<Label style={[styles.footer_tab_text, this.props.activeTab === 2 && {color: colors.blood_red}]}> {I18n.t('NAVIGATION.WALLET')} </Label>
				</Button>
				<Button transparent style={[styles.footer_tab]} onPress={() => this.props.setTabState(3)}>
					<FastImage
						resizeMode={FastImage.resizeMode.contain}
						style={this.props.activeTab === 3 ? styles.footer_tab_icon_active : styles.footer_tab_icon}
						source={
							this.props.activeTab === 3
								? require('@assets/img/profile_active.png') 
								: require('@assets/img/profile_default.png') 
						}
					/>
						<Label style={[styles.footer_tab_text, this.props.activeTab === 3 && {color: colors.blood_red}]}> {I18n.t('NAVIGATION.PROFILE')} </Label>
				</Button>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		activeTab: state.activeTab,
		userColor: state.userColor,
		dashboard: state.dashboard,
		token: state.token,
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setTabState,
			loaderState,
		},
		dispatch,
	)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FooterNavigation)
