import React from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

export default class AddButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 90,
  },
  button: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: "#4D4B4B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
})
