import React from "react"
import { StyleSheet, Image, Text, View } from "react-native"

interface BreadProps {
  bread: {
    name: string
    price: string
    bakery: string
    img: string
  }
}
export default class BreadItem extends React.Component<BreadProps, any> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.bread.img }} resizeMode="center" style={styles.imageStyle} />
        <View style={styles.metadataContainer}>
          <View>
            <Text style={styles.breadTitle}>{this.props.bread.name}</Text>
            <Text style={styles.bakeryPriceTitle}>{this.props.bread.bakery}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bakeryPriceTitle}>{this.props.bread.price}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 160,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  metadataContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
  },
  topContainer: {},
  bottomContainer: {
    paddingBottom: 20,
  },
  breadTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  bakeryPriceTitle: {
    fontWeight: "300",
    fontSize: 14,
  },
  imageStyle: {
    width: 160,
    height: 160,
  },
})
