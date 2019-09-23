import React from "react"
import { Dimensions, StyleSheet, View, Text, FlatList } from "react-native"

const { width } = Dimensions.get("window")
const separatorLength = (width - 232) / 9

export default function Steps({ current = 2, total = [1, 2, 3, 4] }) {
  const renderItem = ({ item }) => (
    <View style={item < current ? styles.prev : item === current ? styles.active : styles.next}>
      <Text style={item < current ? styles.prevText : item === current ? styles.activeText : styles.nextText}>
        {item}
      </Text>
    </View>
  )
  const keyExtractor = item => `${item}`
  const ItemSeparatorComponent = item => (
    <View
      style={[
        item.leadingItem < current ? styles.separatorActive : styles.separator,
        { width: separatorLength < 16 ? separatorLength : 16 },
      ]}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={total}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        horizontal={true}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  prev: {
    backgroundColor: "#111",
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
