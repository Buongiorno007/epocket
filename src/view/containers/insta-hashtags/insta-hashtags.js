import React from "react";
import { View, Text } from "react-native";
//constants
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class InstaHashTags extends React.Component {


  componentDidMount = () => { }

  formatItem = (item) => {
    item = item.trim();
    item.indexOf('#') === -1 && (item = '#'+item)
    return item 
  }

  render = () => {
    return (
      <View style={styles.container}>
        {
          this.props.hashtags.split(',').map((item, index) => {
            return <Text style={styles.items} key={index}>{this.formatItem(item)} </Text>
          })
        }
      </View>
    );
  };
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstaHashTags);
