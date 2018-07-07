import React from "react"
import { FlatList, StyleSheet, View } from "react-native"

import breads from "../data/breads"
import recipes from "../data/recipes"

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
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToAlignment="center"
        snapToInterval={365}
        contentInset={{
          top: 0,
          left: 5,
          bottom: 0,
          right: 5,
        }}
      />
    )
    return (
      <View style={styles.container}>
        <FlatList
          data={breads}
          renderItem={({ item }) => <BreadItem bread={item} />}
          ListHeaderComponent={RecipeHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#e5e5e5",
  },
  recipeList: {
    marginBottom: 10,
    height: 160,
    width: "100%",
  },
})
