import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import {
  FilterBottomSheet,
  HomeHeader,
  Loading,
  Screen,
  Separator,
  Touchable,
  UserItemList,
} from "../components"
import { useTheme, useUsers } from "../hooks"
import { RenderItem, User } from "../interfaces"
import { SPACING } from "../theme"

export const HomeScreen = () => {
  const [{ colors }] = useTheme()
  const [
    { users, isLoading, maxLength },
    { onNextPage, onSelectItem, unselectItem },
  ] = useUsers()
  const [showFilter, setOpenFilter] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const onOpenFilter = () => {
    setOpenFilter(true)
  }

  const onOpenAdd = () => {
    setShowAdd(true)
  }

  const onRequestClose = () => {
    setOpenFilter(false)
    setShowAdd(false)
  }

  const renderItem = ({ item }: RenderItem<User>) => {
    const backgroundColor = item.selected ? colors.secondary : colors.surface
    const hasSelected = !!users.find((item) => item.selected)
    const onPress = () => {
      if (item.selected) return unselectItem(item.id)
      if (hasSelected) return onSelectItem(item.id)

      console.log("onPress")
    }

    const onLongPress = () => {
      onSelectItem(item.id)
    }

    return (
      <Touchable onPress={onPress} onLongPress={onLongPress} key={item.id}>
        <View style={[styles.itemContainer, { backgroundColor }]}>
          <UserItemList user={item} />
        </View>
      </Touchable>
    )
  }

  const RenderFooter = () => {
    if (!isLoading) return <></>

    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    )
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <HomeHeader onOpenAdd={onOpenAdd} onOpenFilter={onOpenFilter} />
      <FlatList
        data={users}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        onEndReachedThreshold={0.1}
        onEndReached={onNextPage}
        ListFooterComponent={RenderFooter}
        contentContainerStyle={styles.flatList}
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
  flatList: {
    paddingBottom: SPACING.XL,
  },
  itemContainer: {
    paddingVertical: SPACING.SM,
  },
  footerContainer: {
    paddingVertical: SPACING.XS,
  },
  loadingContainer: {
    paddingVertical: SPACING.SM,
  },
})
