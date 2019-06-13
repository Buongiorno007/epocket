import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	status: Number,
	products: any[],
}

function totalApprove(produts) {
	let result = true
	produts.forEach((item) => {
		if (item.approve === false || item.amount === 0) {
			return (result = false)
		}
	})
	return result
}

function Status({ status, products }: Props) {
	const check = status === -1
	const approve = totalApprove(products)
	return (
		<View style={styles.layout}>
			<Text style={styles.title}>{check ? I18n.t('TRADE.FAIL') : I18n.t('TRADE.SUCCESS')}</Text>
			{check && <Text style={styles.message}>{I18n.t('TRADE.FAIL_MESSAGE')}</Text>}
			{!check && <Text style={styles.message}>{!approve && I18n.t('TRADE.SUCCESS_MESSAGE')}</Text>}
		</View>
	)
}

const mapStateToProps = (state) => ({
	status: state.socket.status,
	products: state.socket.products,
})

export default connect(mapStateToProps)(Status)
