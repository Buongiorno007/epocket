import React from "react"
import { View, BackHandler, Platform } from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
//components
import Map from "@components/map/map"
import Mappp from "@components/map"
import Profile from "@components/profile/profile"
import GameS from "@components/game-component/game-start"
import GamePartners from "@components/game-component/game-partners"
import Wallet from "@components/wallet"
//containers
import ReturnToMall from "@containers/return-to-mall-timer/return-to-mall-timer"
import TimerModal from "@containers/timer-modal/timer-modal"
import LocationDisabled from "@containers/location-disabled/location-disabled"
//reducers
import { setActiveCard } from "@reducers/set-active-card"
import { getGameStart } from "@reducers/gameStart"
//services
import GeolocationService from "@services/geolocation-service"
import { getPoints } from "@reducers/mapPoints"
import { getPartners } from "@reducers/partners"
import { getBasket } from "@reducers/basket"
//styles
import styles from "./styles"

class Main extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.setActiveCard(false)
      return true
    })
    this.props.activeTab === 0 && this.props.getGameStart()
    if (!this.props.mapPoints.request) {
      this.props.getPoints()
    }
    if (!this.props.partners.online.length) {
      this.props.getPartners()
    }
    if (!this.props.basket.request) {
      this.props.getBasket()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLocation && this.props.isLocation) this.componentDidMount()
    if (prevProps.activeTab !== 0 && this.props.activeTab === 0) this.props.getGameStart()
    if (prevProps.game_status === "ticker" && this.props.game_status !== "ticker") this.props.getGameStart()
  }

  renderLastTab() {
    let container
    if (this.props.game_status === "ticker") {
      container = <GamePartners />
    } else {
      container = <GameS />
    }
    return container
  }

  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.content}>
          {this.props.activeTab === 0 ? this.renderLastTab() : null}
          {/* {this.props.activeTab === 1 ? <Map /> : null} */}
          {this.props.activeTab === 1 && <Mappp />}
          {this.props.activeTab === 2 && <Wallet />}
          {this.props.activeTab === 3 && <Profile />}
        </View>

        {this.props.timerShow &&
          this.props.timer_status &&
          JSON.stringify(this.props.closestMall) !== JSON.stringify(this.props.selectedMall) && <ReturnToMall />}

        {!this.props.isLocation && (this.props.activeTab === 1 || this.props.activeTab === 0) && <LocationDisabled />}
        <TimerModal />
        <GeolocationService />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeTab: state.activeTab,
  timer_status: state.timer_status,
  game_status: state.game_status,
  isLocation: state.location.status,
  timerShow: state.timerShow,
  selectedMall: state.selectedMall,
  closestMall: state.closestMall,
  mapPoints: state.mapPoints,
  partners: state.partners,
  basket: state.basket,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setActiveCard,
      getGameStart,
      getPoints,
      getPartners,
      getBasket,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main)
