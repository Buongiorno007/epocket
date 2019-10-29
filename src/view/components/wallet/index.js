import React, { useState, useEffect } from "react"
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native"
import { connect } from "react-redux"
//containers
import FooterNavigation from "@containers/footer-navigator/footer-navigator"
import WalletDate from "@containers/wallet-containers/wallet-date"
import { getHistory } from "@reducers/wallet"
import { loaderState } from "@reducers/loader"
import I18n from "@locales/I18n"
//styles
import styles from "./styles"

function Wallet({ wallet, profileState, activeTab, dispatch }) {
  const [count, setCount] = useState(1)
  const [historyEnd, sethistoryEnd] = useState(false)

  useEffect(() => {
    if (!wallet.history.length || activeTab === 2) {
      dispatch(loaderState(true))
      dispatch(getHistory(count))
    }
  }, [])

  const renderItem = ({ item }) => {
    return <WalletDate item={item} />
  }

  const keyExtractor = item => item.date

  const loadMore = () => {
    // if (count <= 2) {
      dispatch(getHistory(count + 1, sethistoryEnd))
      setCount(count + 1)
    // }
  }
  const renderFooter = () => {
    if (count > 30 || historyEnd) return null
    return <ActivityIndicator style={{ color: "#000", marginBottom: 16 }} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.wallet_c}>
            <Text style={styles.wallet}>{` ${I18n.t("CASH.TITLE")}\n${wallet.balance} ${profileState.currency}`}</Text>
            {wallet.pending ? <Text style={styles.wallet_p}>{`${I18n.t('WALLET.PENDING_MONEY')}${wallet.pending} ${profileState.currency}`}</Text> : null}
          </View>
          <View style={styles.history}>
            <FlatList
              style={styles.scroll}
              data={wallet.history}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              onEndReachedThreshold={0.4}
              onEndReached={loadMore}
              ListFooterComponent={renderFooter}
            />
          </View>
        </View>
      </View>
      <FooterNavigation />
    </View>
  )
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet,
    profileState: state.profileState,
    activeTab: state.activeTab,
  }
}

export default connect(mapStateToProps)(Wallet)
