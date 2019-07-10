import React, { useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
//containers
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import WalletDate from '@containers/wallet-containers/wallet-date'
//styles
import styles from './styles'

function Wallet({ wallet, profileState }) {
	const colors = ['#F55890', '#FF9950']
	const start = { x: 0.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	useEffect(() => {
		//some getWallet function
	}, [])

	const renderItem = ({ item }) => {
		return <WalletDate item={item} />
	}

	const keyExtractor = (item) => item.date

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<LinearGradient start={start} end={end} colors={colors} style={styles.container}>
					<Image style={styles.circles} source={require('@assets/img/circles.png')} />
					<Text style={styles.wallet}>{`${wallet.value} ${profileState.currency}`}</Text>
					<View style={styles.history}>
						<FlatList
							style={styles.scroll}
							data={wallet.history}
							// horizontal={false}
							// removeClippedSubviews={true}
							// contentContainerStyle={styles.contentContainerStyle}
							keyExtractor={keyExtractor}
							renderItem={renderItem}
							// onScrollBeginDrag={() => {
							// 	let old_limitShops = this.state.limitShops
							// 	this.setState({ limitShops: old_limitShops + 10 })
							// 	this.refreshList()
							// }}
						/>
					</View>
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
