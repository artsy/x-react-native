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
export default class BreadItem extends React.Component<BreadProps, any> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.bread.img }} resizeMode="center" style={styles.imageStyle} />
        <View style={styles.metadataContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.breadTitle}>{this.props.bread.name}</Text>
            <Text style={styles.bakeryPriceTitle}>{this.props.bread.bakery}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bakeryPriceTitle}>{this.props.bread.price}</Text>
            <AddButton />
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#D8D8D8",
  },
  metadataContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
  },
  topContainer: {
    flexGrow: 3,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
    paddingRight: 10,
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
