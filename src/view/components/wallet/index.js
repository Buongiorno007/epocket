import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
//containers
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
//styles
import styles from './styles'

function Wallet({ wallet, profileState }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }
	useEffect(() => {
		//some getWallet function
	}, [])
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
					<Image style={styles.circles} source={require('@assets/img/circles.png')} />

					<Text style={styles.wallet}>{`${wallet.value} ${profileState.currency}`}</Text>
					<View style={styles.history}></View>
				</LinearGradient>
			</View>
			<FooterNavigation />
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		wallet: state.wallet,
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(Wallet)
