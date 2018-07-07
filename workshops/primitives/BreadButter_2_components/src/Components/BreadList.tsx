import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import data from "../data/breads"

import BreadItem from "./BreadItem"

export default class BreadList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={({ item }) => <BreadItem bread={item} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e5e5e5",
  },
})
