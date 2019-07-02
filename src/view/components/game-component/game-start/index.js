import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
//containers
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import HaveGames from '@containers/game-containers/game-start/have-games'
import NoGames from '@containers/game-containers/game-start/no-games'
//styles
import styles from './styles'

function GameStart({ gameStart }, props) {
	console.log(props, '????????????????')
	return (
		<View style={styles.container}>
			{gameStart.id ? <HaveGames /> : <NoGames />}
			<FooterNavigation />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		gameStart: state.gameStart,
	}
}

export default connect(mapStateToProps)(GameStart)
