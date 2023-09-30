import React from 'react'
import {
  TouchableHighlightProps,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface TouchableProps extends TouchableHighlightProps {
  children: React.ReactNode
  enableFeedback?: boolean
  onPress?: () => void
}

const InternalTouchable: React.FC<TouchableProps> = ({
  enableFeedback,
  style,
  ...rest
}) => {
  if (enableFeedback) {
    return (
      <View style={style}>
        <TouchableNativeFeedback {...rest} />
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={style}>{rest.children}</View>
    </TouchableWithoutFeedback>
  )
}

export const Touchable: React.FC<TouchableProps> = ({
  children,
  disabled,
  enableFeedback = true,
  style,
  onPress,
  ...rest
}) => {
  const _onPress = () => {
    if (!disabled && typeof onPress === 'function') onPress()
  }

  return (
    <InternalTouchable
      enableFeedback={enableFeedback}
      onPress={_onPress}
      style={style}
      {...rest}
    >
      {children}
    </InternalTouchable>
  )
}
