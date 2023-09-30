import { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'

const IDLE_HEIGHT = 0
const HEIGHT = 1

type AnimatedIconButton = {
  transform: {
    rotate: Animated.AnimatedInterpolation<any>
  }[]
}

type AnimatedBodyStyle = {
  transform: {
    scale: Animated.AnimatedInterpolation<any>
  }[]
  height: Animated.Value
  opacity: Animated.AnimatedInterpolation<any>
}

type UseDropDownState = {
  animatedIconButtonStyle: AnimatedIconButton
  animatedBodyStyle: AnimatedBodyStyle
  open: boolean
}

type UseDropDownActions = {
  onToggleAccordion: () => void
}

type UseDropDownAnimationData = [
  state: UseDropDownState,
  actions: UseDropDownActions,
]


export const useDropDownAnimation = (): UseDropDownAnimationData => {
  const [open, setOpen] = useState(false)

  const animated = new Animated.Value(open ? HEIGHT : IDLE_HEIGHT)

  useEffect(() => {
    Animated.timing(animated, {
      toValue: open ? HEIGHT : IDLE_HEIGHT,
      easing: Easing.inOut(Easing.ease),
      duration: 225,
      useNativeDriver: false,
    }).start()
  }, [open, HEIGHT, animated])

  const interpolateTransformRotate = animated.interpolate({
    inputRange: [IDLE_HEIGHT, HEIGHT],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  })

  const interpolateOpacity = animated.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const interpolateScale = animated.interpolate({
    inputRange: [HEIGHT / 5, HEIGHT],
    outputRange: [0.9, 1],
    extrapolate: 'clamp',
  })

  const animatedIconButtonStyle = {
    transform: [{ rotate: interpolateTransformRotate }],
  }

  const animatedBodyStyle = {
    transform: [{ scale: interpolateScale }],
    height: animated,
    opacity: interpolateOpacity,
  }

  function onToggleAccordion() {
    setOpen((prevState) => !prevState)
  }

  return [
    {
      animatedIconButtonStyle,
      animatedBodyStyle,
      open,
    },
    {
      onToggleAccordion,
    },
  ]
}
