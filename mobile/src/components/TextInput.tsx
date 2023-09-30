import React from "react"
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from "react-native"
import { SPACING } from "../theme"
import { useTheme } from "../hooks"

interface TextInputProps extends NativeTextInputProps {}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const [{ colors }] = useTheme()
  const textColor = { color: colors.textColor }

  return (
    <View style={styles.container}>
      <NativeTextInput
        autoComplete="name"
        placeholderTextColor={colors.placeholder}
        style={textColor}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.MD,
    borderBottomWidth: 1,
  },
})
