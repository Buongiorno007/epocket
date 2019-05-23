import React from 'react'
import { Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//containers
import CustomButton from '@containers/custom-button/custom-button'
//reducers
import { loaderState } from '@reducers/loader'
//services
import NavigationService from '@services/route'
//locales
import I18n from '@locales/I18n'
//style
import styles from './style'

class CatCode extends React.Component {
	componentDidMount() {
		this.props.loaderState(false)
	}
	navigateMain() {
		this.props.loaderState(true)
		NavigationService.navigate('Main')
	}

	render() {
		return (
			<LinearGradient
				colors={['#F55890', '#FF9950']}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={styles.container}
			>
				<Image style={styles.img} source={require('@assets/img/cat.png')} />
				<Text style={styles.title}>{'Поздравляем!\nЖелаем удачного полета вместе с EpocketCash'}</Text>
				<CustomButton
					color={true ? this.props.userColor.pink : this.props.userColor.white}
					handler={() => this.navigateMain()}
					active={true}
					title={I18n.t('SIGN.START')}
				/>
			</LinearGradient>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
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
)(CatCode)
