import React from "react"
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Platform, Dimensions } from "react-native"
import MapTaskHeader from "@containers/map/map-task-header"
import { connect } from "react-redux"
import { colors } from "@constants/colors"
import route from "@services/route"
import I18n from '@locales/I18n'

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

function InstaPost({profileState}) {
    let element = [
        {
            image: require('@assets/img/instaPostTestBig.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
        {
            image: require('@assets/img/instaPostTest.png'),
            name: 'Coca-Cola',
            price: 5,
            hashtags: '#coca-cola #epocketcash #fun'
        },
       
    ]
    return(     
        <View style={{height: Platform.OS === 'android' ? height - 48 : height,}}>
            <MapTaskHeader title={I18n.t('EARN.POST_INSTA')} noinfo goMain/>
            <ScrollView >
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', alignItems: 'center', justifyContent: 'space-between'}}>
                {element.map((item, index) => (
                    <TouchableOpacity style={[{marginBottom: 16, marginHorizontal: 16 }]} onPress={() => {route.push('InstaPostPublish', {item})}}>
                        <View>
                            <Image style={{width: (width - 64) / 2, height: (width - 64) / 2 }} source={item.image} resizeMode={'contain'}/>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 13, color: colors.black111}}>{item.name}</Text>
                            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 13, color: colors.blood_red}}>{`+ ${item.price} ${profileState.currency}`}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                </View>
            </ScrollView>
        </View>
    )
}
const mapStateToProps = state => ({
    profileState: state.profileState,
  })

export default connect(mapStateToProps)(InstaPost)