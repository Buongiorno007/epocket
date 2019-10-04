// Выложи фото в Instagram и добавь хештеги в описании
import React, { useState } from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image } from "react-native"
import { connect } from "react-redux"
import I18n from "@locales/I18n"
import Video from "react-native-video"
import { photoPosted } from "@reducers/progressTask"

const { width } = Dimensions.get("window")

function DirectlyPost({ progressTask, setPostData, postData, dispatch }) {
  const [video, setVideo] = useState(true)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t(`NEW_MISSIONS.${progressTask.task_details.second_descr}`)}</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {video ? (
          <Video
            source={{
              uri: "https://epocket.dev.splinestudio.com/static/user_media/user_43/2019-10-03_242_video_1900.mp4",
            }} // Can be a URL or a local file.
            onBuffer={() => {}} // Callback when remote video is buffering
            onError={() => setVideo(false)} // Callback when video cannot be loaded
            style={{ width: 200, height: 200 }}
            repeat={true}
            resizeMode={"cover"}
          />
        ) : (
          <Image source={{ uri: postData.media }} style={{ width: width - 32, height: width - 32 }} />
        )}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => setPostData({})}>
          <Text style={styles.buttonText}>{"переснять"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(photoPosted(postData))}>
          <Text style={styles.buttonText}>{"опубликовать"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapStateToProps = state => ({
  progressTask: state.progressTask,
  insta_token: state.insta_token,
})

export default connect(mapStateToProps)(DirectlyPost)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#111",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: (width - 48) / 2,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E60050",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#fff",
  },
})
