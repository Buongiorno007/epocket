import React from "react"
import { View, Text, Image, Dimensions, StyleSheet } from "react-native"
import { connect } from "react-redux"
import I18n from '@locales/I18n'
import { colors } from '@constants/colors'

const { width } = Dimensions.get('window')

function WalletInformationItem({profileState, item}){
    // const zone = new Date()
    // const timeZone = zone.getTimezoneOffset() / 60
    // console.log(new Date(item.item.post_to_time), 'DATEEEEE')
	// let hour = (new Date(post_to_time).getHours())- timeZone
	let hour = (new Date(item.item.post_to_time).getHours())
	let hours = hour < 10 ? '0' + hour : hour
    let minutes = ('0' + new Date(item.item.post_to_time).getMinutes()).slice(-2)
    // let seconds = ('0' + new Date(item.item.post_to_time).getSeconds()).slice(-2)
    let day = ('0' + new Date(item.item.post_to_time).getDate()).slice(-2)
    
    let time = new Date(item.item.post_to_time)
    // let timeToPost = `${day}-${time.getMonth()+1}-${time.getFullYear()} ${hours}:${minutes}:${seconds}`
    let timeToPost = `${day}-${time.getMonth()+1}-${time.getFullYear()} ${hours}:${minutes}`

    let status = ''
    let statusImg = ''
    switch (item.item.status.id) {
        case 1:
            status = I18n.t('WALLET.PENDING')
            statusImg = require('@assets/img/pending.png')
            break;
        case 2:
            status = I18n.t('WALLET.ACCEPTED')
            statusImg = require('@assets/img/accepted.png')
            break;
        case 3:
            status = I18n.t('WALLET.DECLINED')
            statusImg = require('@assets/img/declined.png')
            break;
        case 4:
            status = I18n.t('WALLET.NOT_DONE')
            statusImg = require('@assets/img/not_done.png')
            break;
        case 5:
            status = I18n.t('WALLET.NOT_DONE_NO_HASH')
            statusImg = require('@assets/img/not_done.png')
            break;
        case 6:
            status = I18n.t('WALLET.NOT_DONE_NO_POST')
            statusImg = require('@assets/img/not_done.png')
            break;
        case 7:
            status = I18n.t('WALLET.PENDING')
            statusImg = require('@assets/img/pending.png')
            break;
        case 8:
            status = I18n.t('WALLET.PROCESSED')
            statusImg = require('@assets/img/accepted.png')
            break;
        default:
            break;
    }
    let amount = item.item.amount ? ` x ${item.item.amount}` : ''
    return(
        <View style={[styles.container]}>
            <View style={styles.mainImageC}>
                <Image source={{uri : item.item.image}} resizeMode={'contain'} style={styles.mainImage}/>
            </View>
            <View style={{marginHorizontal: 8}}>
                <View style={styles.textWrapper}><Text style={styles.textBlack}>{`${item.item.name}${amount}`}</Text></View>
                <Text style={
                    [styles.textGray, 
                    item.item.status.id === 3 || item.item.status.id === 4 || item.item.status.id === 5 || item.item.status.id === 6 ? styles.textRed : null]}
                    >
                    {`${status} ${item.item.status.id === 7 ? I18n.t('WALLET.TO') : ''}${item.item.status.id === 7 ? timeToPost : ''}`}
                </Text>
            </View>
            <View style={[styles.price, item.item.status.id === 3 || item.item.status.id === 7 ? styles.priceGray : null]}>
                <Text style={styles.textWhite}>{`${item.item.price} ${profileState.currency}`}</Text>
                <Image source={statusImg} style={styles.priceImage}/>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
	profileState: state.profileState,
  })

export default connect(mapStateToProps)(WalletInformationItem)

const styles = StyleSheet.create({
    container: {
        width: width - 32,
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignSelf: 'center', 
        alignItems: 'flex-start', 
        marginHorizontal: 16, 
        borderTopColor: colors.gray_b1, 
        borderTopWidth: 1, 
        paddingTop: 16, 
        marginBottom: 16
    },
    mainImageC : {
        width: 40, 
        height: 40, 
        borderWidth: 1, 
        borderColor: colors.gray_b1, 
        borderRadius: 80, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    mainImage : {
        width: 40, 
        height: 40
    },
    textWrapper: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        maxWidth: width - 162
    },
    textBlack : {
        fontFamily: 'Rubik-Regular', 
        fontSize: 14, 
        color: colors.black111
    },
    textGray :  {
        fontFamily: 'Rubik-Regular', 
        color: colors.gray_b1, 
        fontSize: 10
    },
    textRed : {
        color: colors.blood_red
    },
    textWhite : {
        fontFamily: 'Rubik-Medium', 
        color: colors.white, 
        marginLeft: 4, 
        fontSize: 12, 
        lineHeight: 24
    },
    price : {
        backgroundColor: colors.black111, 
        borderRadius: 24, 
        minWidth: 72, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 9,
        marginLeft: 'auto'
    },
    priceGray: {
        backgroundColor: colors.gray_b1
    },
    priceImage : {
        width: 16, 
        height: 16, 
        marginHorizontal: 4
    }
})