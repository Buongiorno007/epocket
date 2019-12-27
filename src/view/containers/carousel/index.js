import React from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image, View, TouchableOpacity, Text } from 'react-native'
import { Dimensions, StyleSheet } from 'react-native'
import route from '@services/route'
const { width } = Dimensions.get('window')

export default class MyCarousel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slider1ActiveSlide: 0,
		}
	}
	_renderItem({ item, index }) {
		return <Image source={{ uri: item }} resizeMode={'cover'} style={styles.image} />
	}

	_renderItemNews({ item }) {
		return (
			<TouchableOpacity
				style={[styles.image]}
				key={item.id}
				onPress={() => {
					route.push('NewsDetails', item)
				}}
			>
				<Image style={styles.image2} source={{ uri: item.link }} resizeMode={'cover'} />
				<Text style={[styles.cardTitle, { width: width - 48 }]} numberOfLines={1} ellipsizeMode={'tail'}>
					{item.name}
				</Text>
				<Text style={styles.cardSubtitle}>{item.time}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const { slider1ActiveSlide } = this.state
		const { news } = this.props
		return (
			<View style={{ position: 'relative' }}>
				<Carousel
					ref={(c) => {
						this._carousel = c
					}}
					data={this.props.data}
					renderItem={news ? this._renderItemNews : this._renderItem}
					sliderWidth={width}
					itemWidth={width - 48}
					containerCustomStyle={news ? styles.containerCustomStyle2 : styles.containerCustomStyle}
					loop={true}
					onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
					onLayout={() => this._carousel.triggerRenderingHack()}
					removeClippedSubviews={false}
				/>
				{this.props.pagination && (
					<Pagination
						dotsLength={this.props.data.length}
						activeDotIndex={slider1ActiveSlide}
						containerStyle={styles.paginationContainer}
						dotColor={'white'}
						dotStyle={styles.dots}
						inactiveDotColor={'rgba(255, 255, 255, 0.3)'}
						inactiveDotOpacity={1}
						inactiveDotScale={1}
						carouselRef={this._carousel}
						tappableDots={!!this._carousel}
					/>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	containerCustomStyle: {
		height: (width - 48) * 0.56,
	},
	containerCustomStyle2: {
		height: (width - 48) * 0.66,
	},
	image: {
		width: width - 48,
		height: '100%',
		borderRadius: 12,
	},
	image2: {
		width: width - 48,
		height: (width - 48) * 0.5,
		borderRadius: 12,
	},
	paginationContainer: {
		width: width - 48,
		bottom: 0,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginHorizontal: 24,
		marginTop: -30,
	},
	dots: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 10,
	},
	cardTitle: {
		fontFamily: 'Rubik-Medium',
		color: '#111111',
		fontSize: 15,
	},
	cardSubtitle: {
		fontFamily: 'Rubik-Regular',
		color: '#A6A6A6',
		fontSize: 13,
	},
})
