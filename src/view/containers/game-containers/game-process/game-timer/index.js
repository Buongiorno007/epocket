import React, { useEffect, useState } from "react"
import { View, Dimensions } from "react-native"
import { Button, Text } from "native-base"
import { connect } from "react-redux"
import BackgroundTimer from "react-native-background-timer"
import CustomProgressBar from "@containers/custom/custom-progress-bar/custom-progress-bar"
import { toHHMMSS } from "@services/convert-time"
import I18n from "@locales/I18n"
import styles from "./styles"

const { width } = Dimensions.get("window")

function GameTimer({ gameProcess, profileState, userColor, finished }) {
  const [timer, setTimer] = useState(gameProcess.time)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    this.startInterval(), setProgress(0)
    return () => {
      BackgroundTimer.stopBackgroundTimer()
    }
  }, [])

  startInterval = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      this.timerTask()
    }, 850)
  }

  timerTask = () => {
    if (timer) {
      setTimer(timer - 1)
    } else {
      BackgroundTimer.stopBackgroundTimer()
      finished()
    }
  }

  return (
    <View style={{ paddingTop: 16 }}>
      <View style={styles.game_title}>
        <Text style={styles.game_cost_text}>
          {gameProcess.amount} {I18n.t("EPC", { currency: profileState.currency })}
        </Text>
        <Text style={styles.game_title_text}>{gameProcess.title}</Text>
        <Text style={styles.game_time_text}>{toHHMMSS(timer)}</Text>
      </View>
      <CustomProgressBar
        style={styles.custom_progress}
        gradient={{
          colors: [userColor.second_gradient_color, userColor.first_gradient_color],
          start: { x: 0.0, y: 1.0 },
          end: { x: 1.0, y: 0.0 },
        }}
        animationType={"timing"}
        borderWidth={0}
        borderRadius={12}
        height={5}
        animationConfig={{ duration: gameProcess.time * 1000 }}
        progress={progress}
        width={width - 32}
        useNativeDriver={true}
        unfilledColor={"rgba(0,0,0, 0.09)"}
      />
    </View>
  )
}
const mapStateToProps = state => {
  return {
    userColor: state.userColor,
    gameProcess: state.gameProcess,
    profileState: state.profileState,
  }
}

export default connect(mapStateToProps)(GameTimer)
