import React from "react"
import { StyleSheet, Image, Text, View } from "react-native"

interface BreadProps {
  bread: {
    name: string
    price: number
    bakery: string
    img: string
  }
}
export default class BreadItem extends React.Component<BreadProps, any> {
  render() {
    const thingy =
      "https://photos-4.dropbox.com/t/2/AAC_g4sDQLcxcO38tUdcf0nD_ECeF3zq-gN33J2Zg2m_4g/12/6135859/jpeg/32x32/1/_/1/2/ciabatta.jpg/EO-IygQY6uIKIAcoBw/ZfsZ0IgoG59Cj3hV2KSZjIbso2VbMtdREnhHh5pRWQM?size=2048x1536&size_mode=3"
    return (
      <View style={styles.container}>
        <Image source={{ uri: thingy }} resizeMode="center" style={styles.imageStyle} />
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
