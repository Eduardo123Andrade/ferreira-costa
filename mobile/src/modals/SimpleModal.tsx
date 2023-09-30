import { Text } from "../components/Text"
import { Button } from "../components/Button"
import React from "react"
import { View, StyleSheet } from "react-native"
import { BaseModalProps } from "./BaseModal"
import { Modal } from "./Modal"
import { useTheme } from "../hooks"
import { SPACING } from "../theme"

interface SimpleModalProps extends BaseModalProps {
  title?: string
  message: string
  label?: string
  onPress?: () => void
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  title = "Ops",
  message,
  label = "OK",
  onPress,
  children,
  ...rest
}) => {
  const [{ colors }] = useTheme()
  const { onRequestClose } = rest
  const _onPress = () => {
    if (onPress) return onPress()
    onRequestClose()
  }

  return (
    <Modal
      style={{ backgroundColor: colors.lightIcon }}
      contentContainerStyle={[styles.container]}
      {...rest}
    >
      <View style={styles.titleContainer}>
        <Text color={colors.primary} bold>
          {title}
        </Text>
      </View>

      <View style={styles.messageContainer}>
        <Text color={colors.primary}>{message}</Text>
      </View>

      <View>
        <Button onPress={_onPress}>{label}</Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
  },
  titleContainer: {
    alignItems: "center",
  },
  messageContainer: {
    alignItems: "center",
    paddingVertical: SPACING.MD,
  },
})
