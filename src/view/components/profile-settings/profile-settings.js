import React from "react";
import { View } from "react-native";
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  LogOut = () => {
    AsyncStorage.setItem("user_info", "");
    AsyncStorage.setItem("balance", "");
    NavigationService.navigate("Start");
  };

  render() {
    return (
      <View style={styles.main_view}>
        <View style={styles.header}>
          <View style={styles.header_container}>
            <View style={styles.exit_container}>
              <Button
                rounded
                transparent
                // onPress={() => this.ExitProfile()}
                style={styles.exit_btn}
              >
                <Text style={styles.exit_btn_text}>{RU.PROFILE_PAGE.EXIT}</Text>
              </Button>
            </View>
            <CustomAlert
              title={RU.PROFILE_PAGE.EXIT_TO_START}
              first_btn_title={RU.PROFILE_PAGE.DECLINE}
              second_btn_title={RU.PROFILE_PAGE.EXIT}
              visible={this.state.modalVisible}
              // first_btn_handler={() =>
              //   this.setModalVisible(!this.state.modalVisible)
              // }
              // second_btn_handler={() => this.LogOut()}
              // decline_btn_handler={() =>
              //   this.setModalVisible(!this.state.modalVisible)
              // }
            />
          </View>
        </View>
        <FooterNavigation />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.profileState
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettings);
