import React from "react";
import { View, Text, FlatList } from "react-native";
//containers
import Card from "../card/card";
import OpenedCard from "../opened-card/opened-card";
import LongCard from "../card-long/card-long"
import FooterNavigation from "../../containers/footer-navigator/footer-navigator";
//constants
import { RU } from "../../../locales/ru";
import styles from "./styles";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveCard } from "../../../reducers/set-active-card";
import { selectMission } from "../../../reducers/selected-mission";
import { setDashboardState } from "../../../reducers/dashboard-state";
import { orderBy } from 'lodash';

class CardList extends React.Component {

  _renderItem = item => (
    item.item.type != "instagram_connect" && item.item.type != "facebook_connect" ?
      <Card item={item.item} onPressItem={this._showSelectedCard} /> :
      <LongCard item={item.item} onPressItem={this.props.connectSocial} />
  );
  _submissionOrder = (mission) => {
    let flag = true;
    mission.subMissions.forEach(sub_mission => {
      if (sub_mission.type === 2) {
        flag = false;
      }
    });
    let insta_sub_mission = {
      desc: RU.MISSION.SUBMISSION_3,
      id: 1,
      name: "insta submission",
      type: 2,
      flatlistData: [],
    }
    mission.subMissions.length && (mission.subMissions = orderBy(mission.subMissions, ['type'], ['desc']))
    if (flag) 
      mission.subMissions.push(insta_sub_mission)
    return mission
  }
  _showSelectedCard = selectedCard => {
    this.props.setDashboardState(2);
    this.props.setActiveCard(true);
    this.props.selectMission(this._submissionOrder(selectedCard));
  };
  keyExtractor = item => {
    return item.id + item.type + ""
  };
  render() {
    return (
      <View style={styles.list_view}>
        {!this.props.activeCard ? (
          <View style={styles.list_view}>
            {this.props.missions.length > 0 ? (
              this.props.missions.length - this.props.socialCount == 1 ?
                < View style={styles.list_view}>
                  <FlatList
                    key={"solo_mission"}
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.list_view}
                    horizontal={false}
                    keyExtractor={this.keyExtractor}
                    data={this.props.missions}
                    renderItem={this._renderItem}
                    removeClippedSubviews={true}
                    /*
                    это функция для обновления списка миссий по принципу pool to refresh
                    сделать свайп сверху вниз
                    вызывается по колбеку в родительский компонент
                    */
                    onScrollBeginDrag={() => this.props.onScrollBeginDrag()}
                  />
                </View>
                :
                < View style={styles.list_view}>
                  <FlatList
                    key={"multi_mission"}
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.list_view}
                    horizontal={false}
                    numColumns={2}
                    columnWrapperStyle={{ flexWrap: this.props.socialCount === 1 ? 'nowrap' : 'wrap' }}
                    keyExtractor={this.keyExtractor}
                    data={this.props.missions}
                    renderItem={this._renderItem}
                    /*
                    это функция для обновления списка миссий по принципу pool to refresh
                    сделать свайп сверху вниз
                    вызывается по колбеку в родительский компонент
                    */
                    onScrollBeginDrag={() => this.props.onScrollBeginDrag()}
                  />
                </View>
            ) : (
                <View style={styles.no_tasks}>
                  <Text style={styles.no_tasks_text}>{RU.NO_TASKS}</Text>
                </View>
              )}
          </View>
        ) : (
            <OpenedCard style={!this.props.activeCard ? styles.disabled : null} />
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeCard: state.activeCard,
  userColor: state.userColor,
  missions: state.missions,
  socialCount: state.socialCount
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDashboardState,
      setActiveCard,
      selectMission
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
