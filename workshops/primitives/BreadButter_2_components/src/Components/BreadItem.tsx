import React from "react"
import { Text } from "react-native"

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
    return <Text>{this.props.bread.name}</Text>
  }
}
