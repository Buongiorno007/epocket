import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { formatNumber } from '@services/format-number'
import I18n from '@locales/I18n'
import styles from './styles'

type Props = {
	products: any[],
}

class List extends React.Component {
	keyExtractor = (item, index) => {
		return index.toString()
	}

	renderItem = ({ item, index }) => {
		const { amount, product__name, approve, product__price } = item
		return (
			<View key={i} style={[styles.wrapper, !amount && styles.hidden]}>
				<View style={styles.product}>
					<View style={styles.data}>
						<Text numberOfLines={2} style={styles.text}>
							{product__name}
						</Text>
						{amount >= 1 && approve && (
							<Text style={[styles.text, styles.small]}>{`${formatNumber(
								product__price,
							)} x ${amount} =`}</Text>
						)}
					</View>
					<View style={[styles.data, !approve && styles.error, styles.align]}>
						<Text
							style={[
								styles.text,
								approve && amount > 1 && styles.small,
								!approve && styles.product__price,
							]}
						>
							{amount > 1 && !approve
								? `${formatNumber(product__price)} x ${amount} = ${formatNumber(
										product__price * amount,
								  )}`
								: formatNumber(product__price)}
						</Text>
						{amount > 1 && approve && (
							<Text style={styles.text}>{formatNumber(product__price * amount)}</Text>
						)}
					</View>
					{(!approve || !amount) && (
						<View style={[styles.data, styles.align]}>
							<Text style={[styles.text, styles.message]}>{I18n.t('TRADE.CANCEL')}</Text>
						</View>
					)}
				</View>
			</View>
		)
	}

	render() {
		const { products } = this.props
		return (
			<FlatList
				style={styles.layout}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				showsVerticalScrollIndicator={false}
				data={products}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	products: state.socket.products,
})

export default connect(mapStateToProps)(List)
