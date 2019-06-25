import React, { useState, useEffect } from 'react'
import { View, WebView, Image } from 'react-native'
import { Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles'
import FailerButtons from '@containers/game-containers/game-result/game-failed-buttons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import I18n from '@locales/I18n'
import { toHHMMSS } from '@services/convert-time'
import { ICONS } from '@constants/icons'
import route from '@services/route'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import Partners from '@containers/game-containers/game-partners/partners-view'
import { getGameStart } from '@reducers/gameStart'

function GamePartners({ getGameStart }) {
	useEffect(() => {
		getGameStart()
	}, [])

	return <Partners />
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getGameStart,
		},
		dispatch,
	)

export default connect(
	null,
	mapDispatchToProps,
)(GamePartners)
