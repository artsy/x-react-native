import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import breads from "../data/breads.json"
import recipes from "../data/recipes.json"

import BreadItem from "./BreadItem"
import RecipeItem from "./RecipeItem"

export default class BreadList extends React.Component {
  render() {
    const RecipeHeader = (
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        horizontal={true}
        style={styles.recipeList}
      />
    )
    return (
      <View style={styles.container}>
        <FlatList data={breads} renderItem={({ item }) => <BreadItem bread={item} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#e5e5e5"
  },
  recipeList: {
    marginBottom: 10,
    height: 160,
    width: "100%"
  }
})
