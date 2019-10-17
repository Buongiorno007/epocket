import React from "react"
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from "react-native"
import { connect } from "react-redux"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import I18n from '@locales/I18n'

const { width } = Dimensions.get('window')

import styles from './styles'

function WalletInformation({mallTask, navigation, profileState}) {
	const { item } = navigation.state.params
	const date = `${new Date(item.date).getDate()}.${new Date(item.date).getMonth() + 1}.${new Date(item.date).getFullYear()}`
	console.log('wallinfo_date', date)
	console.log('wallinfo', item)
	return(
		<View style={styles.container}>
			<MapTaskHeader title={I18n.t('WALLET.DETAILS')} noinfo/>
			<MapTaskLogo logo={item.photo} title={item.trade_point_name} time={date} />
			{/* <FlatList style={[styles.scroll, mallTask.type === 1 && styles.none ]} data={mallTask.tasks} renderItem={renderItem} keyExtractor={keyExtractor} />
			{mallTask.type === 1 && <View style={styles.timeTaskContainer}>
				<Text style={styles.timeTaskHeaderText}>{I18n.t('MALL.TASK_TIME')}</Text>
				<Text style={styles.timeTaskNormalText}>{I18n.t('MALL.DONT_LEAVE')}<Text style={styles.timeTaskBoldText}>{time}</Text>{I18n.t('MALL.AND_GET')}</Text>
				<Text style={styles.timeTaskNormalText}><Text style={styles.timeTaskBoldText}>{I18n.t('MALL.WARNING')}</Text>{I18n.t('MALL.LOSE')}</Text>
			</View>} */}

			<View style={{width: width - 32,flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', alignItems: 'flex-start', marginHorizontal: 16, borderTopColor: 'gray', borderTopWidth: 1, paddingTop: 16, marginBottom: 16}}>
				<View style={{width: 40, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 80, alignItems: 'center', justifyContent: 'center'}}>
				<Image source={require('@assets/img/instagram.png')}  resizeMode={'contain'} style={{width: 20, height: 20}}/>
				</View>
				<View style={{marginHorizontal: 8}}>
					<Text style={{fontSize: 14, color: 'black'}}>Отсканируй QR - код в магазине</Text>
					<Text style={{color: 'gray', fontSize: 10}}>Зачислено</Text>
				</View>
				<View style={{backgroundColor: 'black', borderRadius: 24, width: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9, marginLeft: 'auto'}}>
					<Text style={{color: 'white', marginLeft: 4}}>{`+ 10 ${profileState.currency}`}</Text>
					<Image source={require('@assets/img/accepted.png')} style={{width: 16, height: 16, marginHorizontal: 4}}/>
				</View>
			</View>

			<View style={{width: width - 32,flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', alignItems: 'flex-start', marginHorizontal: 16, borderTopColor: 'gray', borderTopWidth: 1, paddingTop: 15}}>
				<View style={{width: 40, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 80, alignItems: 'center', justifyContent: 'center'}}>
				<Image source={require('@assets/img/instagram.png')}  resizeMode={'contain'} style={{width: 20, height: 20}}/>
				</View>
				<View style={{marginHorizontal: 8}}>
					<Text style={{fontSize: 14, color: 'black', maxWidth: width - 48}}>{'Сделай фото кроссовок\nи выложи в Instagram'}</Text>
					<Text style={{color: 'gray', fontSize: 10}}>На проверке</Text>
				</View>
				<View style={{backgroundColor: 'gray', borderRadius: 24, minWidth: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9, marginLeft: 'auto'}}>
					<Text style={{color: 'white', marginLeft: 4}}>{`+ 100 ${profileState.currency}`}</Text>
					<Image source={require('@assets/img/pending.png')} style={{width: 16, height: 16, marginHorizontal: 4}}/>
				</View>
			</View>
		</View>
	)
}
const mapStateToProps = state => ({
	mallTask: state.mallTask,
	profileState: state.profileState,
  })
  
  export default connect(mapStateToProps)(WalletInformation)