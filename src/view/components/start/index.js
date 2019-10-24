import React from "react"
import { View, Image, Text } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import LinearGradient from "react-native-linear-gradient"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Navigate from "@containers/start/navigate"
import { list } from "@reducers/country"
import { internet } from "@reducers/connection"
import { status, current, coordinate } from "@reducers/location"
import { setSounds } from "@reducers/sounds"
import { getUser } from "@reducers/profile-state"
import { loaderState } from "@reducers/loader"
import route from "@services/route"
import Video from "react-native-video"
import styles from "./styles"
import { TouchableOpacity } from "react-native-gesture-handler"
import Renderitem from "./sslider"

class Start extends React.Component {
  state = {
    screen : 0
  }
  setScreen = (data) => {
    this.setState(data)
  }
  componentDidMount() {
    route.exit()
    this.props.internet()
    this.props.connection && this.init()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.connection !== this.props.connection && this.props.connection) {
      this.init()
    }
  }

  init = async () => {
    await this.props.loaderState(true)
    await this.props.setSounds()
    await this.props.current()
    await this.props.status()
    await this.props.coordinate()
    await this.getToken()
  }

  getToken = async () => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      this.props.getUser(token)
    } else {
      this.props.list()
    }
  }

  

  render = () => {    
    return (
      <View style={styles.container}>
        {this.state.screen === 0 && <Renderitem screen={this.state.screen} setScreen={this.setScreen}/>}
        {this.state.screen === 1 && <Renderitem screen={this.state.screen} setScreen={this.setScreen}/>}
        {this.state.screen === 2 && <Renderitem screen={this.state.screen} setScreen={this.setScreen}/>}
        {this.state.screen === 3 && <Renderitem screen={this.state.screen} setScreen={this.setScreen}/>}
        {this.state.screen === 4 && (
          <>
          <Image source={require("@assets/img/EPC0000.jpg")} resizeMode={"cover"} style={styles.video} />
          <Video
            source={require("@assets/video/EPC.mp4")} // Can be a URL or a local file.
            onBuffer={() => {}} // Callback when remote video is buffering
            onError={() => console.log("onError")} // Callback when video cannot be loaded
            style={styles.video}
            repeat={true}
            resizeMode={"cover"}
          />
          <Navigate />
          </>
        )}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  connection: state.connection,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      list,
      internet,
      status,
      coordinate,
      setSounds,
      getUser,
      loaderState,
      current,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start)
