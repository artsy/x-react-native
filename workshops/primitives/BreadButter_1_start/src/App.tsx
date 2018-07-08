import React from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import breads from "./data/breads"

// import BreadItem from "./Components/BreadItem"

export default class App extends React.Component {
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
