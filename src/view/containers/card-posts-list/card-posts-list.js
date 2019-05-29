import React from 'react'
import { View, Text, FlatList } from 'react-native'
//containers
import PostCard from '../card-post/card-post'
//constants
import styles from './styles'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import I18n from '@locales/I18n'

class CardPostsList extends React.Component {
	_renderItem = (item) => <PostCard item={item.item} />
	keyExtractor = (item) => item.id
	render() {
		return (
			<View style={styles.list_view}>
				{this.props.posts.length > 0 ? (
					<FlatList
						contentContainerStyle={styles.contentContainerStyle}
						style={styles.list_view}
						horizontal={false}
						numColumns={1}
						removeClippedSubviews={true}
						keyExtractor={this.keyExtractor}
						data={this.props.posts}
						renderItem={this._renderItem}
					/>
				) : (
					<View style={styles.no_tasks}>
						<Text style={styles.no_tasks_text}>{I18n.t('NO_POSTS')}</Text>
					</View>
				)}
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	userColor: state.userColor,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CardPostsList)
