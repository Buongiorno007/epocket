import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import styles from './styles'

function MapEarnMarker({ profileState, data }) {
	const [radius, setRadius] = useState(false)
	return (
		<View>
			<Marker coordinate={data.location} onPress={() => console.log(data.location, 'DATA LOCATION')}>
				<View style={styles.container}>
					<Image style={styles.img} source={{ uri: data.photo }} />
					<View style={styles.text_view}>
						<Text style={styles.text}>{`${data.price} ${profileState.currency}`}</Text>
					</View>
				</View>
			</Marker>
		</View>
	)
}

const mapStateToProps = (state) => {
	return {
		profileState: state.profileState,
	}
}

export default connect(mapStateToProps)(MapEarnMarker)
