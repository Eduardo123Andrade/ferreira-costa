import React from "react"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { StyleSheet } from "react-native"

interface IconProps {
  color?: string
  name: any
  onPress: () => void
  size?: number
}

export const Icon: React.FC<IconProps> = ({
  color = "#000",
  size = 20,
  ...rest
}) => {
  const style = styles.container
  const props = { color, size, style, ...rest }

  return <MaterialIcons {...props} />
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
})
