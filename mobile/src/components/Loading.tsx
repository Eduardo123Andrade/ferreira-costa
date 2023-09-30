import { useTheme } from "../hooks"
import React from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

interface LoadingProps {
  color?: string
  size?: number
}

export const Loading: React.FC<LoadingProps> = ({ size = 42, color }) => {
  const [{ colors }] = useTheme()
  const defaultColor = color ?? colors.secondaryLight
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={defaultColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
})
