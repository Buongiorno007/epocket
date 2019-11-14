import React from "react"
import { View, Text, Image, TouchableOpacity, Clipboard, Dimensions, Platform } from "react-native"
import { connect } from "react-redux"
import { colors } from "@constants/colors"
import sbHeight from "@services/getSBHeight"
import route from "@services/route"
import I18n from '@locales/I18n'

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

function InstaPostPublish({profileState, navigation}) {
    const { item } = navigation.state.params
    Clipboard.setString(item.hashtags)

    return(
        <View style={{paddingHorizontal: 16, justifyContent: 'space-between', height: Platform.OS === 'android' ? height - 48 : height}}>
            <TouchableOpacity style={{marginTop: sbHeight + 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} onPress={() => {route.pop()}}>
                <View style={{width: 24, height: 24, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 24, height: 24}} source={require('@assets/img/arrow-black-left.png')} resizeMode={'contain'}/>
                </View>                
                <Text style={{fontFamily: 'Rubik-Medium', fontSize: 15, color: colors.black111}}>{item.name}</Text>
                <Text style={{fontFamily: 'Rubik-Medium', fontSize: 13, color: colors.blood_red}}>{`+ ${item.price} ${profileState.currency}`}</Text>
            </TouchableOpacity>

            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 21, color: colors.black111, textAlign: 'center', marginVertical: 8}}>{I18n.t('NEW_MISSIONS.POST_INSTA')}</Text>
            <Text style={{fontFamily: 'Rubik-Regular', fontSize: 13, color: colors.gray_b6, textAlign: 'center', marginVertical: 8}}>{I18n.t('NEW_MISSIONS.HASHTAGS')}</Text>

            <View style={{marginVertical: 16, borderRadius: 12}}>
                <Image style={{width: width - 32, height: width - 32}} source={item.image} resizeMode={'cover'}/>
            </View>

            <Text style={{fontFamily: 'Rubik-Regular', fontSize: 13, color: colors.gray_b6, textAlign: 'center', marginVertical: 8}}>{item.hashtags}</Text>
            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 15, color: colors.black111, textAlign: 'center', marginVertical: 8}}>{I18n.t('MISSION.HASHTAGS_COPIED')}</Text>

            <TouchableOpacity style={{borderRadius: 20, backgroundColor: colors.blood_red, paddingVertical: 8, marginBottom: 16, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Rubik-Bold', fontSize: 17, color: colors.white, textAlign: 'center', textTransform: 'capitalize'}}>{I18n.t('NEW_MISSIONS.PUBLISH')}</Text>
            </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = state => ({
    profileState: state.profileState,
  })
export default connect(mapStateToProps)(InstaPostPublish)