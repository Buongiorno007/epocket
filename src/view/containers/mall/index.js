import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import { getMallTask } from "@reducers/mallTask";

function MallItem({ item, index, profileState, dispatch }) {
  const colors1 = ["#FF9950", "#F55890"];
  const colors2 = ["rgba(246, 50, 114, 0.1)", "rgba(246, 50, 114, 0.1)"];
  const start = { x: 0.0, y: 0.0 };
  const end = { x: 1.0, y: 0.0 };

  return (
    <TouchableOpacity
      disabled={item.type === 1}
      style={[styles.container, index === 0 && styles.noBorder]}
      onPress={() => dispatch(getMallTask(item))}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textView}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.time}</Text>
      </View>
      <LinearGradient colors={item.type === 3 ? colors2 : colors1} start={start} end={end} style={styles.layout}>
        <Text style={item.type === 3 ? styles.arrowTitlePink : styles.arrowTitle}>
          {`${item.price} ${profileState.currency}`}
        </Text>
        {item.type !== 1 && <View style={item.type === 3 ? styles.arrowPink : styles.arrow} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}
const mapStateToProps = state => {
  return {
    profileState: state.profileState,
  };
};

export default connect(mapStateToProps)(MallItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#F5F9FE",
    borderTopColor: "rgba(112, 112, 112, 0.3)",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noBorder: {
    borderTopWidth: 0,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  layout: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  arrow: {
    width: 8,
    height: 8,
    borderRightWidth: 1,
    borderRightColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    transform: [{ rotate: "45deg" }],
    marginLeft: 8,
    alignItems: "center",
  },
  arrowPink: {
    width: 8,
    height: 8,
    borderRightWidth: 1,
    borderRightColor: "#F63272",
    borderTopWidth: 1,
    borderTopColor: "#F63272",
    transform: [{ rotate: "45deg" }],
    marginLeft: 8,
    alignItems: "center",
  },
  arrowTitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#fff",
  },
  arrowTitlePink: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#F63272",
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-light",
    color: "#404140",
  },
  subtitle: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#7C7C7C",
  },
  textView: {
    flexGrow: 1,
  },
});
