import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { usePutRequest, useResponseModal, useTheme, useUsers } from "../hooks"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { Loading } from "./Loading"
import { SimpleModal } from "../modals"

interface HomeHeaderProps {
  onOpenAdd: () => void
  onOpenFilter: () => void
}

interface Variables {
  userIds: string[]
}

interface HeaderLineProps {
  color: string
  bold?: boolean
  label: string
  loading?: boolean
  name: string
  onPress: () => void
}

const HeaderLine: React.FC<HeaderLineProps> = ({
  bold,
  label,
  loading,
  ...rest
}) => {
  return (
    <View style={styles.headerLine}>
      <Text bold={bold}>{label}</Text>
      {loading ? (
        <View>
          <Loading size={24} />
        </View>
      ) : (
        <Icon {...rest} />
      )}
    </View>
  )
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onOpenAdd,
  onOpenFilter,
}) => {
  const [{ users, maxLength, selectedItems }, { resetState }] = useUsers()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [{ colors }] = useTheme()
  const [
    { show, message },
    { startModalResponse, resetState: resetStateModal },
  ] = useResponseModal()

  const { mutate, isLoading } = usePutRequest<any, Variables>(
    "/users/disable",
    {
      onSuccess: () => {
        resetState()
        setLoadingDelete(false)
      },
      onError: ({ response }) => {
        startModalResponse(response.data.message)
      },
    }
  )

  const onDeleteAll = () => {
    setLoadingDelete(true)
    const userIds = users.map((item) => item.id)
    mutate({ userIds })
  }

  const onDelete = () => {
    mutate({ userIds: selectedItems })
  }

  return (
    <View style={styles.container}>
      {!!users.length && (
        <HeaderLine
          bold
          label={`Total: ${users.length}/${maxLength}`}
          color={colors.textColor}
          name="filter-list"
          onPress={onOpenFilter}
        />
      )}

      <HeaderLine
        label="Adicinar usuario"
        color={colors.textColor}
        name="add"
        onPress={onOpenAdd}
      />

      {!!users.length && (
        <HeaderLine
          label="Deletar todos"
          loading={loadingDelete}
          color={colors.textColor}
          name="delete"
          onPress={onDeleteAll}
        />
      )}

      {!!selectedItems.length && !loadingDelete && (
        <HeaderLine
          label={`Selecionados: ${selectedItems.length}`}
          loading={isLoading}
          color={colors.textColor}
          name="delete"
          onPress={onDelete}
        />
      )}
      <SimpleModal
        message={message}
        visible={show}
        onRequestClose={resetStateModal}
      />
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
