import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Icon } from "./Icon"
import { useNavigation } from "@react-navigation/native"
import { SPACING } from "theme"
import { Text } from "./Text"
import { useTheme } from "hooks"

interface BaseNavigationHeaderProps {
  iconColor?: string
  iconName?: string
  onPress?: () => void
  title: string
}

export const BaseNavigationHeader: React.FC<BaseNavigationHeaderProps> = ({
  iconColor,
  iconName,
  onPress,
  title,
}) => {
  const [canGoBack, setCanGoBack] = useState(false)

  const navigation = useNavigation()
  const [{ colors }] = useTheme()

  const flattenedStyles = StyleSheet.flatten([
    styles.container,
    { backgroundColor: colors.background },
  ])

  useEffect(() => {
    setCanGoBack(navigation.canGoBack())
  }, [])

  const onPressBack = () => {
    if (navigation.canGoBack()) navigation.goBack()
  }

  const _onPress = () => {
    if (typeof onPress === "function") return onPress()
  }

  return (
    <View style={flattenedStyles}>
      {canGoBack ? (
        <View>
          <Icon onPress={onPressBack} name="arrow-back" />
        </View>
      ) : (
        <View style={styles.emptyView} />
      )}

      <Text bold fontSize={18}>
        {title}
      </Text>

      {!!iconName ? (
        <View>
          <Icon color={iconColor} onPress={_onPress} name={iconName} />
        </View>
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.MD,
    height: 60,
  },
  emptyView: {
    width: SPACING.MD,
  },
})
