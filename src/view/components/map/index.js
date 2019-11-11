import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import GameS from "@components/game-component/game-start"
import GamePartners from "@components/game-component/game-partners"
// import FooterNavigation from '@containers/footer-navigator/footer-navigator'
// import TopTabBar from '@containers/map/top-tab-bar'
// import MapEarn from './map-earn'
// import MapSpend from './map-spend'

function Mappp({ topTabs, game_status }) {

	return (
		<View style={{ flex: 1 }}>
			{game_status === "ticker" ? <GamePartners /> : <GameS />}
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		topTabs: state.topTabs,
		game_status: state.game_status,
	}
}

export default connect(mapStateToProps)(Mappp)
