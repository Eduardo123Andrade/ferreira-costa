import React from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { useTheme, useUsers } from "../hooks"
import { Text } from "./Text"
import { Icon } from "./Icon"

interface HomeHeaderProps {
  onOpenFilter: () => void
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onOpenFilter }) => {
  const [{ users, maxLength, selectedItems }] = useUsers()
  const [{ colors }] = useTheme()

  const onDelete = () => {
    console.log("???")
  }

  return (
    <View style={styles.container}>
      {!!users.length && (
        <View style={styles.headerLine}>
          <Text bold>{`Total: ${maxLength}`}</Text>
          <Icon
            color={colors.textColor}
            name="filter-list"
            onPress={onOpenFilter}
          />
        </View>
      )}

      {!!selectedItems.length && (
        <View style={styles.headerLine}>
          {!!users.length && (
            <Text>{`Selecionados: ${selectedItems.length}`}</Text>
          )}
          <Icon color={colors.textColor} name="delete" onPress={onDelete} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.MD,
    paddingBottom: SPACING.SM,
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.XS,
  },
})
