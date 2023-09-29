import React from "react"
import { StyleSheet, Text, View } from "react-native"

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Olá mundo!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F11",
  },
})
