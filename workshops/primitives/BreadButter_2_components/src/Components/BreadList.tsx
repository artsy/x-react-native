import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import breads from "../data/breads"
import recipes from "../data/recipes"

import BreadItem from "./BreadItem"
import RecipeItem from "./RecipeItem"

export default class BreadList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList data={recipes} renderItem={({ item }) => <RecipeItem recipe={item} />} />
        <FlatList data={breads} renderItem={({ item }) => <BreadItem bread={item} />} />
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
