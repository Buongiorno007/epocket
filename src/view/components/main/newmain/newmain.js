import React from "react"
import { View, BackHandler, AppState, Dimensions } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
//components
import Profile from "@components/profile/profile"
import NewProfile from "@components/profile/newprofile/newprofile"
import Wallet from "@components/wallet"
//containers
// import ReturnToMall from "@containers/mall/return-to-mall-timer/return-to-mall-timer"
// import TimerModal from "@containers/map/timer-modal/timer-modal"
import LocationDisabled from "@containers/location-disabled/location-disabled"
//reducers
import { setActiveCard } from "@reducers/set-active-card"
import { getGameStart } from "@reducers/gameStart"
//services
import GeolocationService from "@services/geolocation-service"
import { getPoints } from "@reducers/mapPoints"
import { getPartners } from "@reducers/partners"
import { getBasket } from "@reducers/basket"
import { loaderState } from '@reducers/loader'
//styles
import styles from "./styles"
import NewMapEarn from '@components/map/map-earn/new-map-earn'
import MapSpend from '@components/map/map-spend'
import { getHistory } from "@reducers/wallet"
import { getInstaList } from "@reducers/progressTask"
import sbHeight from "@services/getSBHeight"

class Main extends React.Component {
  state = {
    appState: AppState.currentState,
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.setActiveCard(false)
      return true
    })
    this.props.activeTab === 0 && this.props.getGameStart()
    console.log('MAIN MOUNTED')
    if (!this.props.mapPoints.request) {
      this.props.getPoints()
    }
    if (!this.props.partners.online.length) {
      this.props.getPartners()
    }
    if (!this.props.basket.request) {
      this.props.getBasket()
    }
    AppState.addEventListener('change', this._handleAppStateChange)
    this.props.getHistory(1)
    this.props.getInstaList()
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
      // this.componentDidMount()
    this.props.activeTab !== 0 && this.props.progressTask.id === 0 && this.props.loaderState(false)
    if (this.props.isLocation) this.componentDidMount()
    }
    this.setState({appState: nextAppState});
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLocation && this.props.isLocation) this.componentDidMount()
    if (prevProps.activeTab !== 0 && this.props.activeTab === 0) this.props.getGameStart()
    if (prevProps.mapPoints.outlets.length !==  this.props.mapPoints.outlets.length  && this.props.isLocation) this.props.getPoints()
    if (prevProps.game_status === "ticker" && this.props.game_status !== "ticker") this.props.getGameStart()
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  

  render() {
    const screenHeight = Dimensions.get('screen').height
	  const windowHeight = Dimensions.get('window').height

    return (
      <View style={[screenHeight !== windowHeight ? {height: screenHeight} : {height: windowHeight}]}>
        {/* <View style={{borderWidth: 1, borderColor: 'green'}}> */}
          {this.props.activeTab === 0 && <NewMapEarn />}
          {this.props.activeTab === 1 && <MapSpend />}
          {this.props.activeTab === 2 && <Wallet />}
          {/* {this.props.activeTab === 3 && <Profile />} */}
          {this.props.activeTab === 3 && <NewProfile />}
        {/* </View> */}

        {/* {this.props.timerShow &&
          this.props.timer_status &&
          JSON.stringify(this.props.closestMall) !== JSON.stringify(this.props.selectedMall) && <ReturnToMall />} */}

        {!this.props.isLocation && (this.props.activeTab === 1 || this.props.activeTab === 0) && <LocationDisabled />}
        {/* <TimerModal /> */}
        {/* <GeolocationService /> */}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeTab: state.activeTab,
  game_status: state.game_status,
  isLocation: state.location.status,
  timerShow: state.timerShow,
  selectedMall: state.selectedMall,
  closestMall: state.closestMall,
  mapPoints: state.mapPoints,
  partners: state.partners,
  basket: state.basket,
  progressTask: state.progressTask
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveCard,
      getGameStart,
      getPoints,
      getPartners,
      getBasket,
      loaderState,
      getHistory,
      getInstaList,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
