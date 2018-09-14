import React from "react";
import { View, Text, FlatList } from "react-native";
//containers
import Card from "../card/card";
import OpenedCard from "../opened-card/opened-card";
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

class CardList extends React.Component {

  _renderItem = item => (
    <Card item={item.item} onPressItem={this._showSelectedCard} />
  );

  compareType = (a, b) => {
    if (a.type < b.type)
      return 1;
    return 0;
  }

  _submissionOrder = (mission) => {
    console.log("mission", mission.subMissions.sort(this.compareType))

    mission.subMissions.length && (mission.subMissions = mission.subMissions.sort(this.compareType))
    return mission
  }
  _showSelectedCard = selectedCard => {
    this.props.setDashboardState(2);
    this.props.setActiveCard(true);
    this.props.selectMission(this._submissionOrder(selectedCard));
  };

  render() {
    return (
      <View style={styles.list_view}>
        {!this.props.activeCard ? (
          <View style={styles.list_view}>
            {this.props.missions.length > 0 ? (
              <View style={styles.list_view}>
                <View style={styles.shadow}>
                  <Text style={styles.tasks}>{RU.TASKS.toUpperCase()}</Text>
                </View>
                <FlatList
                  contentContainerStyle={styles.contentContainerStyle}
                  style={styles.list_view}
                  horizontal={false}
                  numColumns={2}
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
            <FooterNavigation />
          </View>
        ) : (
            <OpenedCard style={!this.props.activeCard ? styles.disabled : null} />
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeCard: state.activeCard,
  missions: state.missions,
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
