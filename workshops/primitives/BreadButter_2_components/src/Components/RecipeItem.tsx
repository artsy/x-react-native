import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

interface RecipeProps {
  recipe: {
    title: string
    img: string
  }
}

export default class RecipeItem extends React.Component<RecipeProps> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.recipe.img }} resizeMode="cover" style={styles.imageStyle} />
        <View style={styles.coverView} />
        <Text style={styles.textStyle}>{this.props.recipe.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 160,
    width: 355,
    overflow: "hidden",
    borderRadius: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  coverView: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    left: 0,
  },
  textStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: 0,
  },
})
