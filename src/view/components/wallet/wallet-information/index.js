import React from "react"
import { View, FlatList } from "react-native"
import { connect } from "react-redux"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import I18n from '@locales/I18n'
import WalletInformationItem from "@components/wallet/wallet-information/wallet-information-item"

import styles from './styles'

function WalletInformation({navigation}) {
	const { item } = navigation.state.params
	const date = `${new Date(item.date).getDate()}.${new Date(item.date).getMonth() + 1}.${new Date(item.date).getFullYear()}`

	const zzz = [
	{
		image: require('@assets/img/instagram.png'),
		name: 'Отсканируй QR - код в магазине',
		status: 0,
		why_declined : '',
		price: '10'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото кроссовок\nи выложи в Instagram',
		status: 1,
		why_declined : '',
		price: '20'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото футболки\nи выложи в Instagram',
		status: 2,
		why_declined : '(отсутствуют хэштеги)',
		price: '30'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото рюкзака\nи выложи в Instagram',
		status: 3,
		why_declined : '',
		price: '50'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Отсканируй QR - код в магазине',
		status: 0,
		why_declined : '',
		price: '10'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото кроссовок\nи выложи в Instagram',
		status: 1,
		why_declined : '',
		price: '20'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото футболки\nи выложи в Instagram',
		status: 2,
		why_declined : '(отсутствуют хэштеги)',
		price: '30'
	},
	{
		image: require('@assets/img/instagram.png'),
		name: 'Сделай фото рюкзака\nи выложи в Instagram',
		status: 3,
		why_declined : '',
		price: '50'
	}]
	console.log('wallinfo', item)
	return(
		<View style={styles.container}>
			<MapTaskHeader title={I18n.t('WALLET.DETAILS')} noinfo/>
			<MapTaskLogo logo={item.photo} title={item.trade_point_name} time={date} />	
			<FlatList 
				style={{}}
				data={zzz}
				// keyExtractor={keyExtractor}
				renderItem={(item, index) => <WalletInformationItem item={item} key={index}/>}
			/>
		</View>
	)
}
  
export default connect()(WalletInformation)