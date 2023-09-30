import { useTheme } from "../../hooks"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native"
import { SPACING } from "../../theme"

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")
const BORDER_RADIUS = 16
const HALF_SECOND = 500

const CLOSE_ANIMATION_CONFIG: Animated.TimingAnimationConfig = {
  toValue: SCREEN_HEIGHT,
  duration: HALF_SECOND,
  useNativeDriver: true,
}

const START_ANIMATION_CONFIG: Animated.TimingAnimationConfig = {
  toValue: 0,
  duration: HALF_SECOND,
  useNativeDriver: true,
}

export interface BottomSheetProps extends NativeModalProps {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  onRequestClose: () => void
  contentContainerStyle?: StyleProp<ViewStyle>
  cancelable?: boolean
  closeButtonColor?: string
  showGoBackArrow?: boolean
  onAnimationFinish?: () => void
}

export const BottomSheet = ({
  style,
  children,
  onRequestClose,
  contentContainerStyle,
  cancelable = true,
  closeButtonColor,
  showGoBackArrow = false,
  visible = false,
  onAnimationFinish,
  ...props
}: BottomSheetProps) => {
  const [{ colors }] = useTheme()
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [modalVisibility, setModalVisibility] = useState(visible)

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

  useEffect(() => {
    if (visible && !animationCompleted) {
      setModalVisibility(true)

      Animated.timing(translateY, START_ANIMATION_CONFIG).start(() => {
        setAnimationCompleted(true)
      })
    }
  }, [visible, animationCompleted, translateY])

  const _onRequestClose = useCallback(() => {
    if (!cancelable) {
      return
    }

    Animated.timing(translateY, CLOSE_ANIMATION_CONFIG).start(
      ({ finished }) => {
        if (finished) {
          onRequestClose()
          setAnimationCompleted(false)
          setModalVisibility(false)
          if (typeof onAnimationFinish === "function") {
            onAnimationFinish()
          }
        }
      }
    )
  }, [translateY, cancelable, onRequestClose, onAnimationFinish])

  useEffect(() => {
    if (!visible && animationCompleted) {
      _onRequestClose()
    }
  }, [visible, animationCompleted, _onRequestClose])

  return (
    <NativeModal
      visible={modalVisibility}
      transparent
      statusBarTranslucent={false}
      animationType="none"
      {...props}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ translateY }],
                backgroundColor: colors.surface,
              },
              style,
            ]}
          >
            <View>
              <View style={[styles.childrenContainer, contentContainerStyle]}>
                {children}
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  subContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#59585F80",
    justifyContent: "flex-end",
  },
  card: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingBottom: SPACING.LG,
    overflow: "hidden",
  },
  childrenContainer: {
    paddingHorizontal: SPACING.LG,
  },
})
