'use-strict'

// base libs
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Marker } from 'react-native-maps'
import { Text, View, StyleSheet, Image } from 'react-native'
import { colors } from '@constants/colors'

export default class ClusterMarker extends Component {
	constructor(props) {
		super(props)

		this.onPress = this.onPress.bind(this)
	}

	onPress() {
		this.props.onPress(this.props)
	}

	render() {
		const pointCount = this.props.properties.point_count // eslint-disable-line camelcase
		const latitude = this.props.geometry.coordinates[1],
			longitude = this.props.geometry.coordinates[0]

		if (this.props.renderCluster) {
			const cluster = {
				pointCount,
				coordinate: { latitude, longitude },
				clusterId: this.props.properties.cluster_id,
			}
			return this.props.renderCluster(cluster, this.onPress)
		}

		let scaleUpRatio = this.props.scaleUpRatio
			? this.props.scaleUpRatio(pointCount)
			: 1 + Math.min(pointCount, 999) / 100
		if (isNaN(scaleUpRatio)) {
			console.warn('scaleUpRatio must return a Number, falling back to default') // eslint-disable-line
			scaleUpRatio = 1 + Math.min(pointCount, 999) / 100
		}

		let width = Math.floor(this.props.clusterInitialDimension * scaleUpRatio),
			height = Math.floor(this.props.clusterInitialDimension * scaleUpRatio),
			fontSize = Math.floor(this.props.clusterInitialFontSize * scaleUpRatio),
			borderRadius = Math.floor(width / 2)

		// cluster dimension upper limit
		width = width <= this.props.clusterInitialDimension * 2 ? width : this.props.clusterInitialDimension * 2
		height = height <= this.props.clusterInitialDimension * 2 ? height : this.props.clusterInitialDimension * 2
		fontSize = fontSize <= 18 ? fontSize : 18

		const { clusterText, noPrice } = this.props

		return (
			<Marker coordinate={{ latitude, longitude }} style={{zIndex: 11}} onPress={this.onPress}>
				<View style={styles.container}>
					<Image style={styles.image} source={require('@assets/img/epocket_icon.png')} />
					{!noPrice && (
						<View style={styles.textView}>
							<Text style={styles.counterText}>{clusterText}</Text>
						</View>
					)}
				</View>
			</Marker>
		)
	}
}

ClusterMarker.defaultProps = {
	clusterText: '0',
	noPrice: false,
}

ClusterMarker.propTypes = {
	scaleUpRatio: PropTypes.func,
	renderCluster: PropTypes.func,
	onPress: PropTypes.func.isRequired,
	geometry: PropTypes.object.isRequired,
	properties: PropTypes.object.isRequired,
	clusterInitialFontSize: PropTypes.number.isRequired,
	clusterInitialDimension: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 40,
		height: 40,
	},
	counterText: {
		color: colors.white,
		alignSelf: 'center',
	},
	textView: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 20,
		marginTop: 8,
		backgroundColor: colors.blood_red,
	},
})
