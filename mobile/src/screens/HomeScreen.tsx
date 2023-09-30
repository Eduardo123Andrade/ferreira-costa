import React, { useEffect, useState } from "react"
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
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProps } from "../types"

type RootStackParamList = {
  AddUserScreen: undefined
  UpdateUserScreen: undefined
}

type LoginScreenNavigationProp = StackNavigationProps<RootStackParamList>

export const HomeScreen = () => {
  const [{ colors }] = useTheme()
  const [
    { users, isLoading },
    { onNextPage, onSelectItem, unselectItem, resetState, onSelectUser },
  ] = useUsers()
  const [showFilter, setOpenFilter] = useState(false)

  const navigation = useNavigation<LoginScreenNavigationProp>()

  const onOpenFilter = () => {
    setOpenFilter(true)
  }

  const goToAddScreen = () => {
    navigation.navigate("AddUserScreen")
  }

  const onRequestClose = () => {
    setOpenFilter(false)
  }

  const renderItem = ({ item }: RenderItem<User>) => {
    const backgroundColor = item.selected ? colors.secondary : colors.surface
    const hasSelected = !!users.find((item) => item.selected)
    const onPress = () => {
      if (item.selected) return unselectItem(item.id)
      if (hasSelected) return onSelectItem(item.id)

      onSelectUser(item)
      navigation.navigate("UpdateUserScreen")
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

  useEffect(
    () =>
      navigation.addListener("focus", () => {
        if (users.length) {
          resetState()
        }
      }),
    [navigation, users, resetState]
  )

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
      <HomeHeader onOpenAdd={goToAddScreen} onOpenFilter={onOpenFilter} />
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
