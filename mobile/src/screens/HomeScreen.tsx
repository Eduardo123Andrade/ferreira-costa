import { useTheme } from "../hooks"
import { Screen, Separator, Text, UserItemList } from "../components"
import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { RenderItem, User } from "../interfaces"
import { SPACING } from "../theme"
import { USER_LIST } from "../mocks/userList"

export const HomeScreen = () => {
  const [{ colors }] = useTheme()

  const renderItem = ({ item }: RenderItem<User>) => {
    const backgroundColor = colors.surface

    return (
      <View key={item.id} style={[styles.itemContainer, { backgroundColor }]}>
        <UserItemList user={item} />
      </View>
    )
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <FlatList
        data={USER_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  itemContainer: {
    paddingVertical: SPACING.SM,
  },
  footerContainer: {
    paddingVertical: SPACING.XS,
  },
})
