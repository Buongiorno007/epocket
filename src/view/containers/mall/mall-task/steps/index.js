import React from "react"
import { Dimensions, StyleSheet, View, Text, FlatList, Image } from "react-native"
import { connect } from "react-redux"

const { width } = Dimensions.get("window")
const separatorLength = (width - 232) / 9

function Steps({ progressTask }) {
  const totalCount = [...Array(progressTask.totalTasks).keys()].map(x => x + 1)

  const renderItem = ({ item }) => (
    <View
      style={
        item < progressTask.currentTask ? styles.prev : item === progressTask.currentTask ? styles.active : styles.next
      }
    >
      {item < progressTask.currentTask ? (
        <Image source={require('@assets/img/checked.png')} resizeMode={'contain'} style={{width: 20, height: 20}}/>
      ) : (
        <Text
        style={
          item < progressTask.currentTask
            ? styles.prevText
            : item === progressTask.currentTask
            ? styles.activeText
            : styles.nextText
        }
      >
        {item}
      </Text>
      )}
    </View>
  )
  const keyExtractor = item => `${item}`
  const ItemSeparatorComponent = item => (
    <View
      style={[
        item.leadingItem < progressTask.currentTask ? styles.separatorActive : styles.separator,
        { width: separatorLength < 16 ? separatorLength : 16 },
      ]}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={totalCount}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal={true}
        scrollEnabled={false}
      />
    </View>
  )
}
const mapStateToProps = state => ({
  progressTask: state.progressTask,
})

export default connect(mapStateToProps)(Steps)

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  prev: {
    backgroundColor: "transparent",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  prevText: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: "#fff",
  },
  active: {
    borderWidth: 1,
    borderColor: "#111",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: "#111",
  },
  next: {
    backgroundColor: "#E5E5E5",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    fontSize: 12,
    fontFamily: "Rubik-Medium",
    color: "#B1B1B1",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginTop: 9.5,
  },
  separatorActive: {
    height: 1,
    backgroundColor: "#111",
    marginTop: 9.5,
  },
})
