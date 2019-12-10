import React from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'react-native'
import { Dimensions, StyleSheet } from 'react-native'
import { View } from 'native-base'
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

	render() {
		const { slider1ActiveSlide } = this.state
		return (
			<View style={{ position: 'relative' }}>
				<Carousel
					ref={(c) => {
						this._carousel = c
					}}
					data={this.props.data}
					renderItem={this._renderItem}
					sliderWidth={width}
					itemWidth={width - 48}
					containerCustomStyle={styles.containerCustomStyle}
					onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
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
	image: {
		width: width - 48,
		height: '100%',
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
})
