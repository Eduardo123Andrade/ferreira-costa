import { Icon } from "../components/Icon"
import React from "react"
import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

export interface BaseModalProps extends NativeModalProps {
  contentContainerStyle?: StyleProp<ViewStyle>
  onRequestClose: () => void
}

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  contentContainerStyle,
  style,
  ...rest
}) => {
  const { onRequestClose } = rest

  const _onRequestClose = () => {
    onRequestClose()
  }

  return (
    <NativeModal
      transparent
      statusBarTranslucent={false}
      animationType="fade"
      {...rest}
    >
      <View style={styles.container}>
        <View style={[styles.modal, style]}>
          <View style={styles.headerModal}>
            <Icon
              size={24}
              name="close"
              color={"#000"}
              onPress={_onRequestClose}
            />
          </View>
          <View style={[contentContainerStyle]}>{children}</View>
        </View>
      </View>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000AA",
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: 250,
    padding: 20,
  },
  headerModal: {
    flexDirection: "row-reverse",
  },
})
