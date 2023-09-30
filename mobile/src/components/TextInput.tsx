import React, { forwardRef, useCallback, useState } from "react"
import {
  StyleSheet,
  View,
  TextInput as NativeTextInput,
  TextInputProps,
} from "react-native"
import { InputStatus } from "../types"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { useTheme } from "../hooks"
import { SPACING } from "../theme"

const PLACE_HOLDER_TEXT_COLOR = "#AAA"

interface InputTextProps extends TextInputProps {
  disabled?: boolean
  label?: string
  onPressOnDisabled?: () => void
  status?: InputStatus
  subtitle?: string
}

const Input: React.ForwardRefRenderFunction<NativeTextInput, InputTextProps> = (
  {
    disabled,
    label,
    onPressOnDisabled,
    style,
    status = "IDLE",
    subtitle,
    ...rest
  },
  ref
) => {
  const { secureTextEntry: initialSecureTextEntry = false } = rest
  const [secureTextEntry, setSecureTextEntryValue] = useState(
    initialSecureTextEntry
  )

  const [{ colors }] = useTheme()

  const statusColor = {
    ERROR: colors.error,
    SUCCESS: colors.full,
    IDLE: colors.full,
  }
  const textColor = { color: colors.textColor }

  const toggleSecureTextEntry = useCallback(() => {
    if (disabled) return
    setSecureTextEntryValue((prevState) => !prevState)
  }, [disabled, setSecureTextEntryValue])

  const defaultSideElement = useCallback(() => {
    if (initialSecureTextEntry) {
      const name = secureTextEntry ? "visibility-off" : "visibility"

      return (
        <Icon
          name={name}
          onPress={toggleSecureTextEntry}
          size={20}
          color="#B3B9A3"
        />
      )
    }
  }, [secureTextEntry, toggleSecureTextEntry, initialSecureTextEntry])

  return (
    <View>
      <View style={[styles.container, { borderColor: statusColor[status] }]}>
        <View style={styles.textInputContainer}>
          <View style={styles.inputTextContainer}>
            <NativeTextInput
              ref={ref}
              style={[styles.inputText, textColor, style]}
              editable={!disabled}
              placeholderTextColor={colors.placeholder}
              {...rest}
              secureTextEntry={secureTextEntry}
            />
            {defaultSideElement()}
          </View>
        </View>
      </View>
      {!!subtitle && (
        <View style={styles.subtitleContainer}>
          <Text fontSize={12} style={{ color: statusColor[status] }}>
            {subtitle}
          </Text>
        </View>
      )}
    </View>
  )
}

export const TextInput = forwardRef(Input)

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  textInputContainer: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
  },
  inputTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    flex: 1,
  },
  subtitleContainer: {
    paddingTop: SPACING.XS,
    paddingHorizontal: SPACING.SM,
  },
})
