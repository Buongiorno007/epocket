import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
//containers
import Card from '@containers/game-containers/game-partners/partner-card'
import FooterNavigation from '@containers/footer-navigator/footer-navigator'
import { setTabState } from '@reducers/tabs'
//components
import GameSite from '@components/game-component/game-site'
//locales
import I18n from '@locales/I18n'
//styles
import styles from './styles'

function GamePartners({ gameTicker, dispatch }) {
	const [link, setLink] = useState('')
	const [site, setSite] = useState(false)
	const colors = ['#770CE1', '#D629C5', '#F55890', '#FF8D50', '#F7BB42']
	const start = { x: 1.0, y: 0.0 }
	const end = { x: 0.0, y: 1.0 }

	const setVisitLink = async (link) => {
		await setLink(link)
		await setSite(!site)
	}
	const keyExtractor = (item, index) => {
		return index.toString()
	}

	const renderItem = ({ item, index }) => {
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
		<View style={styles.gradient}>
			<Text style={styles.zifi_text}>{I18n.t('GAME.ZIFI.MORE_GAMES')}</Text>
			<Image style={styles.zifi} source={require('@assets/img/zifi/playful.gif')} />
			<View style={styles.container}>
				<Text style={styles.visit_partners}>{I18n.t('GAME.VISIT_PARTNERS')}</Text>
				<FlatList
					style={styles.brands}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					numColumns={2}
					keyExtractor={keyExtractor}
					renderItem={renderItem}
					data={gameTicker.partners}
				/>
				<TouchableOpacity
					onPress={() => {
						dispatch(setTabState(1))
					}}
					style={styles.visit_trc}
				>
					<Text style={styles.visit_trc_text}>{I18n.t('GAME.VISIT_NEAREST_ONE')}</Text>
				</TouchableOpacity>
			</View>
			<FooterNavigation />
			{site && <GameSite timing={gameTicker.timer} setSite={() => setSite(!site)} link={link} />}
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameTicker: state.gameTicker,
	}
}

export default connect(mapStateToProps)(GamePartners)
