import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Screen, UserForm } from "../components/"
import { SPACING } from "../theme"
import { UserValidationForm } from "interfaces"
import { usePutRequest, useUsers } from "../hooks"

const INITIAL_VALUES: UserValidationForm = {
  name: "CCCCCCCCC CCCCCCCCC",
  password: "123123",
  cpf: "97207033001",
  login: "CCCCCC",
  motherName: "CCCCCCC CCCCCCCC",
  phone: "00000000000",
  email: "e@email.com",
  birthdate: new Date(),
  status: "ACTIVE",
}

const id = "3ff22112-1c31-494b-ba2a-2f7eabaee65b"

export const UpdateUserScreen = () => {
  const navigation = useNavigation()
  const [{ selectedUser }] = useUsers()

  const { mutate, isLoading } = usePutRequest(`/user/${selectedUser.id}`, {
    onSuccess: () => {
      navigation.goBack()
    },
    onError: ({ response }) => {
      console.log(response.data.message)
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
