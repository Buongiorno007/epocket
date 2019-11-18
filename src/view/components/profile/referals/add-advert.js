import React from 'react'
import { View, Text, Linking, Image, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'
import { shareToOneSocial } from '@services/share-ref-link'

function AddAdvert({profileState}) {
	return (
		<View style={styles.container}> 
            <View style={styles.top}>
                <TouchableOpacity onPress={() => route.pop()}>
                    <Image style={styles.topImg} source={require('@assets/img/arrow-black-left.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={styles.text}>{I18n.t('REF_LINK.ADD_ADVERT2')}</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Image style={styles.topImg} source={{}} resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>

            
            <View style={styles.add}>
                <Image style={styles.addImg} source={require('@assets/img/add-advert-white.png')} resizeMode={'contain'}/>
                <View>
                    <Text style={styles.addText}>{`+ $ 50`}</Text>
                    <Text style={styles.addText}>{`+ 1% ${I18n.t('REF_LINK.CASHBACK')}`}</Text>
                </View>
            </View>

            <Text style={styles.text}>{I18n.t('REF_LINK.ADD_WITH')}</Text>
            <TouchableOpacity 
                style={[styles.socialLink]} 
                // onPress={() => {shareToOneSocial(this.state.refferal_link, this.state.refferal_price, 'all', this.props.profileState.currency)}} 
                disabled
            >
                <Image style={styles.socialIco} source={require('@assets/img/links.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Telegram-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Viber-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Messenger-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/WhatsUpp-ico.png')} resizeMode={'contain'}/>
            </TouchableOpacity>

            <ScrollView>
                <Text style={[styles.textBig, styles.margin]}>{I18n.t('ADVERT.HEADER1')}</Text>
                <Text style={[styles.textSmall, styles.margin]}>{I18n.t('ADVERT.TEXT1')}</Text>
                <Text style={styles.textSmall}>{I18n.t('ADVERT.MORE')}</Text>
                <Text style={[styles.textSmall, styles.textRed]} onPress={() => Linking.openURL('http://epocketcash.com')}>epocketcash.com</Text>
                <Text style={[styles.textBig, styles.margin]}>{I18n.t('ADVERT.HEADER2')}</Text>
                <Text style={[styles.textSmall, styles.margin]}>{I18n.t('ADVERT.TEXT2')}</Text>
                <Text style={styles.textSmall}>{I18n.t('ADVERT.TEXT3')}</Text>
            </ScrollView>
        </View>
	)
}
const mapStateToProps = (state) => {
	return {		
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(AddAdvert)