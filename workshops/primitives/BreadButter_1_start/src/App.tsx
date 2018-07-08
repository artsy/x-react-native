import React from "react"
import { Component } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import breads from "./data/breads"

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={breads} renderItem={({ item }) => <Text>{item.name}</Text>} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
})
