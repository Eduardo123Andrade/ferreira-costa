import { useTheme, useUsers } from "../hooks"
import {
  BottomSheet,
  FilterBottomSheet,
  Icon,
  Screen,
  Separator,
  Text,
  Touchable,
  UserItemList,
} from "../components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { RenderItem, User } from "../interfaces"
import { SPACING } from "../theme"
import { USER_LIST } from "../mocks/userList"
import { FlatList } from "react-native-gesture-handler"

export const HomeScreen = () => {
  const [{ colors }] = useTheme()
  const [{ users }] = useUsers()
  const [showFilter, setOpenFilter] = useState(false)

  const onOpenFilter = () => {
    setOpenFilter(true)
  }

  const onRequestClose = () => {
    setOpenFilter(false)
  }

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
      <View style={styles.header}>
        <Icon
          color={colors.textColor}
          name="filter-list"
          onPress={onOpenFilter}
        />
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
      />
      <FilterBottomSheet visible={showFilter} onRequestClose={onRequestClose} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row-reverse",
    paddingHorizontal: SPACING.MD,
  },
  itemContainer: {
    paddingVertical: SPACING.SM,
  },
  footerContainer: {
    paddingVertical: SPACING.XS,
  },
})
