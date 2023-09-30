import React from "react"
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlightProps,
  View,
} from "react-native"
import { Text } from "./Text"
import { Touchable } from "./Touchable"
import { SPACING } from "../theme"
import { useTheme } from "../hooks"

interface ButtonProps extends TouchableHighlightProps {
  children: string
  isLoading?: boolean
  onPress?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  isLoading,
  disabled,
  ...rest
}) => {
  const [{ colors }] = useTheme()
  const flattenedStyles = StyleSheet.flatten([
    styles.container,
    {
      backgroundColor: disabled ? colors.disabled : colors.secondary,
    },
    style,
  ])

  return (
    <Touchable disabled={disabled || isLoading} {...rest}>
      <View style={flattenedStyles}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.error} />
        ) : (
          <View style={styles.textContainer}>
            <Text color={colors.buttonLabel}>{children}</Text>
          </View>
        )}
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
})
