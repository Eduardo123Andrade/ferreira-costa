import { useTheme } from "../hooks"
import {
  BottomSheet,
  FilterBottomSheet,
  Screen,
  Separator,
  Text,
  Touchable,
  UserItemList,
} from "../components"
import React from "react"
import { StyleSheet, View } from "react-native"
import { RenderItem, User } from "../interfaces"
import { SPACING } from "../theme"
import { USER_LIST } from "../mocks/userList"
import { FlatList } from "react-native-gesture-handler"

export const HomeScreen = () => {
  const [{ colors }] = useTheme()

  const renderItem = ({ item }: RenderItem<User>) => {
    const backgroundColor = colors.surface

    const onPress = () => {
      console.log("onPress")
    }

    const onLongPress = () => {
      console.log("onLongPress")
    }

    return (
      <Touchable onPress={onPress} onLongPress={onLongPress} key={item.id}>
        <View style={[styles.itemContainer, { backgroundColor }]}>
          <UserItemList user={item} />
        </View>
      </Touchable>
    )
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <FlatList
        data={USER_LIST}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
      <FilterBottomSheet visible onRequestClose={() => {}} />
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
