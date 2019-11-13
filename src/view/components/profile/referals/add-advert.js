import React from 'react'
import { View, Text, Linking, Image, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import route from '@services/route'
import I18n from '@locales/I18n'
import styles from './styles'

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
            <TouchableOpacity style={styles.socialLink}>
                <Image style={styles.socialIco} source={require('@assets/img/links.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Telegram-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Viber-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/Messenger-ico.png')} resizeMode={'contain'}/>
                <Image style={styles.socialIco} source={require('@assets/img/WhatsUpp-ico.png')} resizeMode={'contain'}/>
            </TouchableOpacity>

            <ScrollView>
                <Text style={[styles.textBig, styles.margin]}>Заработать 50 $ проще, чем кажется</Text>
                <Text style={[styles.textSmall, styles.margin]}>Хочешь еще больше интересных вопросов и возможностей заработка? Расскажи об этом своим родственникам, друзьям и знакомым. Среди них наверняка есть те, кто ищет клиентов для своего бизнеса. Расскажи им о преимуществах ePocketCash и дай им реферальную ссылку. Использовав твою ссылку, они получат 10% скидку на подключение, а ты получишь 50$ на свой счет ePocketCash.</Text>
                <Text style={styles.textSmall}>Более детальную информацию читай на сайте</Text>
                <Text style={[styles.textSmall, styles.textRed]} onPress={() => Linking.openURL('http://epocketcash.com')}>epocketcash.com</Text>
                <Text style={[styles.textBig, styles.margin]}>Ежемесячный кешбек</Text>
                <Text style={[styles.textSmall, styles.margin]}>Сделай разовый доход регулярным. Каждый подключенный по твоей реферальной ссылке бизнес-аккаунт будет приносить тебе 1% от оборота. Ежемесячно!</Text>
                <Text style={styles.textSmall}>Как это происходит? Например: Ты рассказал кому-то о ePocketCash.
    Твои знакомые подключились к системе ePocketCash. При подключении бизнес-аккаунта была использована именно твоя реферальная ссылка. 
    Владелец бизнес-аккаунта пополнил свой счет в системе для размещения рекламы в ePocketCash. Система начислит на твой счет кешбек в размере 1% от каждого пополнения счета на следующий день после пополнения.</Text>
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