import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import {
  FilterBottomSheet,
  Icon,
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
  const [{ users, isLoading }, { onNextPage }] = useUsers()
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
  header: {
    flexDirection: "row-reverse",
    paddingHorizontal: SPACING.MD,
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
