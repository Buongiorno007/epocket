import React, { useState, useEffect } from 'react'
import { View, ImageBackground } from 'react-native'
import { Button, Text } from 'native-base'
import { connect } from 'react-redux'
import styles from './styles'

function GameField({ gameProcess, showChanges }) {
	const [but, setBut] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

	useEffect(() => {
		showChanges(but)
	}, [but])

	const changeItem = (index) => {
		let arr = but
		arr[index] = !but[index]
		setBut([...arr])
	}

	return (
		<View>
			<Text style={styles.game_description_text}>{gameProcess.descr}</Text>
			<ImageBackground source={{ uri: gameProcess.image }} style={styles.container} resizeMode={'cover'}>
				{but.map((item, index) => {
					return (
						<Button
							key={index}
							transparent
							style={[styles.it, item ? styles.item_pressed : styles.item]}
							onPress={() => changeItem(index)}
						/>
					)
				})}
			</ImageBackground>
		</View>
	)
}
const mapStateToProps = (state) => {
	return {
		gameProcess: state.gameProcess,
	}
}

export default connect(mapStateToProps)(GameField)
