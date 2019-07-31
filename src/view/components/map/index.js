import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import TopTabBar from '@containers/top-tab-bar'
import MapEarn from './map-earn'
import MapSpend from './map-spend'

function Mappp({ topTabs }) {
	return (
		<View style={{ flex: 1 }}>
			<TopTabBar />
			{topTabs === 0 && <MapEarn />}
			{topTabs === 1 && <MapSpend />}
			<FooterNavigation />
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		topTabs: state.topTabs,
	}
}

export default connect(mapStateToProps)(Mappp)
