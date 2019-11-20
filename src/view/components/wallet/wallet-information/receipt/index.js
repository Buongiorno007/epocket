import React from "react"
import { View, FlatList, Text, StyleSheet, Image } from "react-native"
import { connect } from "react-redux"
import MapTaskHeader from "@containers/map/map-task-header"
import MapTaskLogo from "@containers/map/map-task-logo"
import I18n from '@locales/I18n'
import WalletInformationItem from "@components/wallet/wallet-information/wallet-information-item"
import { colors } from "@constants/colors"

function Receipt({navigation, profileState}) {
    const { item } = navigation.state.params
    
    let hour = (new Date(item.date).getHours())
	let hours = hour < 10 ? '0' + hour : hour
    let minutes = ('0' + new Date(item.date).getMinutes()).slice(-2)
	const date = `${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}/${new Date(item.date).getFullYear()}  ${hours}:${minutes}`

    const renderItem = (item) => {
        let total = Number(item.item.price) * item.item.amount
        return(
            <View  style={styles.details}>
                <View>
                    <Text style={styles.textRegular}>{item.item.name}</Text>
                    <Text style={styles.textRegular}>{`${item.item.price} x ${item.item.amount}`}</Text>
                </View>
                <Text style={[styles.textMedium, {fontSize: 15,}]}>{`${total} ${profileState.currency}`}</Text>
            </View>
        )
    }
	const keyExtractor = (item, index) => `${index}`
	console.log('wallinfo', item)
	let summary = 0
	item.info.forEach((item) => {
		summary += Number(item.price) * item.amount
	})
	return(
		<View>
			<MapTaskHeader title={I18n.t('WALLET.RECEIPT')} noinfo/>
            <View style={styles.container}>
                <Text style={styles.textTitle}>{item.trade_point_name}</Text>
                <View style={styles.date}>
                    <Text style={styles.textMedium}>{`${I18n.t('WALLET.DATE')}`}</Text>
                    <Text style={styles.textMedium}>{date}</Text>
                </View>
                <FlatList 
                    style={styles.list}
                    bord
                    data={item.info}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
                <View style={styles.summary}>
                    <Text style={[styles.textRegular, {fontSize: 17,}]}>{`${I18n.t('WALLET.TOTAL')}`}</Text>
                    <Text style={[styles.textMedium, {fontSize: 17,}]}>{`${summary} ${profileState.currency}`}</Text>
                </View>
            </View>
		</View>
	)
}
const mapStateToProps = state => ({
	profileState: state.profileState,
  })
  
export default connect(mapStateToProps)(Receipt)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    textTitle: {
        fontFamily: 'Rubik-Medium',
        fontSize: 24,
        color: colors.black111,
        marginVertical: 24
    },
    textMedium: {
        fontFamily: 'Rubik-Medium',
        fontSize: 13,
        color: colors.black111,
    },
    textRegular: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15,
        color: colors.black111,
    },
    list: {
        paddingVertical: 8,
        marginVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.map_gray,
        borderBottomColor: colors.map_gray
    },
    date:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    details:{
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
})