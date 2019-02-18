import React from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "native-base";
//constants
import styles from "./styles";
import { RU } from "../../../locales/ru";
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
  _keyExtractor = (item, index) => String(item.id);
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
        <View style={styles.inner_conainer}>
          <View style={styles.name_container}>
            <Text style={styles.name}
              numberOfLines={3}
            >
              {this.props.item.trade}
            </Text>
          </View>
          <Text style={styles.price}
            numberOfLines={1}
          >
            {this.props.item.formated.amount} {RU.EPC}
          </Text>
          <View style={styles.bottom_container}>
            <Text
              style={styles.time_text}
              numberOfLines={1}
            >
              {RU.MAP.WILL_BE_ACTIVE}
            </Text>
            <Text
              style={styles.time_range}
              numberOfLines={1}
            >
              {this.props.item.date_start.substring(10, 16)} - {this.props.item.date_end.substring(10, 16)}
            </Text>
          </View>
        </View>
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