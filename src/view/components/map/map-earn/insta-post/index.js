import React from "react"
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Platform, Dimensions } from "react-native"
import MapTaskHeader from "@containers/map/map-task-header"
import { connect } from "react-redux"
import { colors } from "@constants/colors"
import route from "@services/route"
import I18n from '@locales/I18n'
import { getMallTask } from "@reducers/mallTask"
import { getInstaPost } from "@reducers/progressTask"

const { width } = Dimensions.get('window')
const height =
	Platform.OS === 'android' && Platform.Version > 26
		? Dimensions.get('screen').height
		: Dimensions.get('window').height

function InstaPost({profileState, mallTask, dispatch}) {
    const { tasks } = mallTask
    console.log(tasks, 'ttttaaasss')

    return(     
        <View style={{height: '100%'}}>
            <MapTaskHeader title={I18n.t('EARN.POST_INSTA')} noinfo goMain/>
            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-around', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16}}>
                {tasks.map((item, index) => (
                    // <TouchableOpacity style={[{marginBottom: 16, marginHorizontal: 16 }]} onPress={() => {route.push('InstaPostPublish', {item})}}>
                    <TouchableOpacity style={[{marginBottom: 16, marginHorizontal: 10}]} onPress={() => {dispatch(getInstaPost(item.mission_id, item.outlet_id))}} key={index}>
                        <View>
                            <Image style={{width: (width - 64) / 2, height: (width - 64) / 2, borderRadius: 12 }} source={{uri : item.task_details.photo}} resizeMode={'contain'}/>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 13, color: colors.black111, width: (width - 170) / 2}} ellipsizeMode={'tail'} numberOfLines={1}>{item.name}</Text>
                            <Text style={{fontFamily: 'Rubik-Medium', fontSize: 13, color: colors.blood_red}}>{`${item.price} ${profileState.currency}`}</Text>
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
    mallTask: state.mallTask,
  })

export default connect(mapStateToProps)(InstaPost)