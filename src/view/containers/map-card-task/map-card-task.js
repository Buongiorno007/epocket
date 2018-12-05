import React from "react";
import { View, Text, Dimensions, Platform, FlatList } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { colors } from "../../../constants/colors";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CardTask extends React.Component {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };
  _renderItem = item => (
    <View style={styles.list_item}>
      <Text style={styles.list_item_text}>{item.index + 1}. {item.item.name}</Text>
    </View>
  );
  _keyExtractor = (item, index) => item.key;
  render() {
    return (
      <Button
        style={
          [styles.card, Platform.OS === 'android' && {
            borderTopWidth: 1,
            borderTopColor: 'rgba(217, 221, 224, 0.5)',
          }]
        }
        onPress={this._onPress}
      >
        <View style={styles.top_container}>
          <Text
            style={styles.time_range}
          >
            {this.props.item.price} epc /{this.props.item.date_start.substring(10, 16)} - {this.props.item.date_end.substring(10, 16)}
          </Text>
          <Text style={[styles.owner]}>
            {this.props.item.trade}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.list_content}
          horizontal={true}
          keyExtractor={this._keyExtractor}
          data={this.props.item.subMissions}
          renderItem={this._renderItem}>
        </FlatList>
      </Button>
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
)(CardTask);