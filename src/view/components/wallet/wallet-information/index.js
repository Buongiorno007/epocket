import React from "react"
import { View, FlatList, Text } from "react-native"
import { connect } from "react-redux"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import I18n from '@locales/I18n'
import WalletInformationItem from "@components/wallet/wallet-information/wallet-information-item"

import styles from './styles'

function WalletInformation({navigation, profileState}) {
	const { item } = navigation.state.params
	const date = `${new Date(item.date).getDate()}.${new Date(item.date).getMonth() + 1}.${new Date(item.date).getFullYear()}`

	const keyExtractor = (item, index) => `${index}`
	console.log('wallinfo', item)
	return(
		<View style={styles.container}>
			<MapTaskHeader title={I18n.t('WALLET.DETAILS')} noinfo/>
			<MapTaskLogo logo={item.image} title={item.trade_point_name} time={date} />	
			<FlatList 
				style={{}}
				data={item.info}
				keyExtractor={keyExtractor}
				renderItem={(item) => <WalletInformationItem item={item}/>}
			/>
		</View>
	)
}
const mapStateToProps = state => ({
	profileState: state.profileState,
  })
  
export default connect(mapStateToProps)(WalletInformation)