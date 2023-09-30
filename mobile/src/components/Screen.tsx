import { useTheme } from "../hooks"
import React from "react"
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

interface ScreenProps extends ViewProps {
  contentContainerStyles?: StyleProp<ViewStyle>
}

export const Screen: React.FC<ScreenProps> = (
  { children, contentContainerStyles },
  ...rest
) => {
  const [{ colors }] = useTheme()
  const flattenedStyles = StyleSheet.flatten([
    styles.container,
    { backgroundColor: colors.background },
    contentContainerStyles,
  ])

  return (
    <SafeAreaView style={styles.container} {...rest}>
      <View style={flattenedStyles}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
