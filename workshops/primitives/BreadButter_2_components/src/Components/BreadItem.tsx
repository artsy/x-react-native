import React from "react"
import { StyleSheet, Image, Text, View } from "react-native"
import AddButton from "./AddButton"

interface BreadProps {
  bread: {
    name: string
    price: string
    bakery: string
    img: string
  }
}
export default class BreadItem extends React.Component<BreadProps> {
  render() {
    return (
      <View>
        <Image source={{ uri: "myurl" }} />
        <View>
          <View>
            <Text>{this.props.bread.name}</Text>
            <Text>{this.props.bread.bakery}</Text>
          </View>
          <View>
            <Text>{this.props.bread.price}</Text>
            {/* <AddButton /> */}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
})
