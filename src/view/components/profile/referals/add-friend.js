import React, {useState, useEffect} from 'react'
import { View, Text, Linking, Image, Platform, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'
import { shareToOneSocial } from '@services/share-ref-link'
import { urls } from '@constants/urls'
import { httpPost } from '@services/http'
import QRCode from "react-native-qrcode-svg"
import { loaderState } from '@reducers/loader'

const { width } = Dimensions.get('window')

function AddFriend({profileState, token,  dispatch}) {
    const [refferal_link, setRefferal_link] = useState('');
    const [refferal_price, setRefferal_price] = useState('');

    useEffect(() => {
        dispatch(loaderState(true))
        httpPost(urls.get_referral_link, JSON.stringify({}), token).then(
			(result) => {
                console.log('link.result', result)
                setRefferal_link(result.body.new_link ? result.body.new_link : urls.ref_link + result.body.link)
                setRefferal_price(Number(Number(result.body.ref_reward).toFixed(2)))
				dispatch(loaderState(false))
			},
			(error) => {
                dispatch(loaderState(false))
                route.pop()
			},
		)
    }, []);
	return (
		<View style={styles.container}> 
            <View style={styles.top}>
                <TouchableOpacity onPress={() => route.pop()}>
                    <Image style={styles.topImg} source={require('@assets/img/arrow-black-left.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={styles.text}>{I18n.t('REF_LINK.ADD_FRIEND2')}</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Image style={styles.topImg} source={{}} resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>

            
            <View style={styles.add}>
                <Image style={styles.addImg} source={require('@assets/img/add-friend-white.png')} resizeMode={'contain'}/>
                <View>
                    <Text style={styles.addText}>{`+ ${refferal_price} ${profileState.currency} ${I18n.t('REF_LINK.GET_EPC')}`}</Text>
                </View>
            </View>

            <Text style={styles.text}>{I18n.t('REF_LINK.ADD_WITH')}</Text>
            <TouchableOpacity 
                style={[styles.socialLink]} 
                onPress={() => {shareToOneSocial(refferal_link, refferal_price, 'all', profileState.currency)}} 
            >
                <Image style={styles.socialIco} source={require('@assets/img/links.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Telegram-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Viber-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Messenger-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/WhatsUpp-ico.png')} resizeMode={'contain'}/>
            </TouchableOpacity>

            <Text style={styles.text}>{I18n.t('REF_LINK.ADD_SHOW')}</Text>
            <View style={styles.qrContainer}>
                {refferal_link !== '' && <QRCode value={refferal_link} size={ width / 2 } logoSize={50}/>}
            </View>
        </View>
	)
}
const mapStateToProps = (state) => {
	return {		
		profileState: state.profileState,
		token: state.token,
	}
}

export default connect(mapStateToProps)(AddFriend)