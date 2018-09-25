import React from "react";
import { View, Image } from "react-native";
//constants
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class TemplateInstagramPhoto extends React.Component {


  componentDidMount = () => { }

  render = () => {
    return (
      <View style={styles.container}>
        <View style={styles.template}>
          {
            this.props.template_url ?
              <Image
                style={styles.template_image}
                source={{ uri: this.props.template_url }}
              />
              :
              <Image
                style={styles.template_image}
                source={require('../../../assets/img/preloader_nobg.gif')}
              />
          }

        </View>
        <View style={styles.back_view}/>
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
)(TemplateInstagramPhoto);
