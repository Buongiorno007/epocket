import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import I18n from '@locales/I18n'
import styles from './styles'
import Card from '@containers/game-containers/game-partners/partner-card'
import GameSite from '@components/game-component/game-site'
import LinearGradient from 'react-native-linear-gradient'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'

function GamePartners({ gameTicker }) {
	const [link, setLink] = useState('')
	const [site, setSite] = useState(false)
	const colors = ['#770CE1', '#D629C5', '#F55890', '#FF8D50', '#F7BB42']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	const setVisitLink = async (link) => {
		await setLink(link)
		await setSite(!site)
	}
	keyExtractor = (item, index) => {
		return index.toString()
	}

	renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity
				key={index}
				style={styles.each_brand}
				onPress={() => {
					setVisitLink(item.link)
				}}
			>
				<Card image={item.image} name={item.name} />
			</TouchableOpacity>
		)
	}

	return (
		<LinearGradient colors={colors} start={start} end={end} style={styles.gradient}>
			<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.MORE_GAMES')}</Text>
			<Image style={styles.zifi} source={require('@assets/img/zifi/playful.gif')} />
			<View style={styles.container}>
				<Text style={styles.visit_partners}>{I18n.t('GAME.VISIT_PARTNERS')}</Text>
				<FlatList
					style={styles.brands}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					numColumns={2}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
					data={gameTicker.partners}
				/>
				<TouchableOpacity style={styles.visit_trc}>
					<Text style={styles.visit_trc_text}>{I18n.t('GAME.VISIT_NEAREST_ONE')}</Text>
				</TouchableOpacity>
			</View>
			<FooterNavigation />
			{site && (
				<GameSite timing={gameTicker.timer} changeTimer={() => {}} setSite={() => setSite(!site)} link={link} />
			)}
		</LinearGradient>
	)
}
const mapStateToProps = (state) => {
	return {
		gameTicker: state.gameTicker,
	}
}

export default connect(mapStateToProps)(GamePartners)
