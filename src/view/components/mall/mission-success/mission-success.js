import React from "react"
import { View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { Button } from "native-base"
//constants
import styles from "./styles"
import { ICONS } from "../../../../constants/icons"
import { colors } from "../../../../constants/colors"
//services
import NavigationService from "../../../../services/route"
//redux
import { loaderState } from "../../../../reducers/loader"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import I18n from "@locales/I18n"

class MissionSuccess extends React.Component {
  state = {
    currency: "",
  }

  componentDidMount = () => {
    this.props.loaderState(false)
    this.setState({ currency: this.props.profileState.currency })
  }

  render = () => {
    return (
      <View style={styles.container}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image_background}
          source={require("@assets/img/ANIMATED_EARN_MORE.gif")}
        />
        <LinearGradient
          colors={this.props.userColor.earn_more}
          start={{ x: 0.0, y: 1.4 }}
          end={{ x: 1.0, y: 0.0 }}
          style={styles.grad}
        />
        <View style={styles.success}>
          {/* <Text style={styles.congratulation}>{I18n.t('MISSION.SUCCESS')}</Text> */}
          <Text style={styles.cash}>
            {/* {I18n.t('MISSION.CASH')} {this.props.navigation.state.params.price}{' '} */}
            {/* {I18n.t('EPC', { currency: this.state.currency })} */}
            {I18n.t("MISSION.FOR_CASH", {
              value: this.props.navigation.state.params.price,
              currency: this.state.currency,
            })}
          </Text>
          <Button
            rounded
            transparent
            block
            style={styles.button}
            androidRippleColor={this.props.userColor.card_shadow}
            onPress={() => {}}
          >
            <Text style={styles.text}>{I18n.t("OK")}</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userColor: state.userColor,
  profileState: state.profileState,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loaderState,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MissionSuccess)
