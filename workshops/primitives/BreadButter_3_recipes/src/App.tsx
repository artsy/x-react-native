import React from "react"
import { Component } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import data from "./data/breads"

import BreadItem from "./Components/BreadItem"

type Props = {}
export default class App extends Component<Props> {
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
