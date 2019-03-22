import React from "react";
import { View, Text, FlatList } from "react-native";
//containers
import Card from "../card/card";
import PostCard from "../card-post/card-post"
//constants
import PickedLanguage from "../../../locales/language-picker";
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveCard } from "../../../reducers/set-active-card";
import { selectMission } from "../../../reducers/selected-mission";
import { setDashboardState } from "../../../reducers/dashboard-state";
import { orderBy } from 'lodash';

class CardPostsList extends React.Component {

    _renderItem = item => (
        <PostCard item={item.item} />
    );
    keyExtractor = item => item.id;
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
                            <Text style={styles.no_tasks_text}>{PickedLanguage.NO_POSTS}</Text>
                        </View>
                    )}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userColor: state.userColor,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardPostsList);
