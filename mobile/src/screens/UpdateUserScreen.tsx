import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Screen, UserForm } from "../components/"
import { usePutRequest, useResponseModal, useUsers } from "../hooks"
import { UserValidationForm } from "../interfaces"
import { SimpleModal } from "../modals"
import { SPACING } from "../theme"

export const UpdateUserScreen = () => {
  const navigation = useNavigation()
  const [{ selectedUser }] = useUsers()
  const [{ show, message }, { startModalResponse, resetState }] =
    useResponseModal()
  const { mutate, isLoading } = usePutRequest(`/user/${selectedUser.id}`, {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: ({ response }) => {
      startModalResponse(response.data.message)
    },
  })

  const onSubmit = (data: UserValidationForm) => {
    const { password, ...rest } = data
    mutate(rest)
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <UserForm
          isEdit
          loading={isLoading}
          onSubmit={onSubmit}
          initialValues={selectedUser}
        />
      </ScrollView>
      <SimpleModal
        message={message}
        visible={show}
        onRequestClose={resetState}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentContainer: {
    minHeight: "100%",
    padding: SPACING.MD,
    justifyContent: "space-between",
  },
})
