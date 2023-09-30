import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Screen, UserForm } from "../components/"
import { usePostRequest } from "../hooks"
import { UserValidationForm } from "../interfaces"
import { SPACING } from "../theme"

const statusList = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Inativo", value: "INACTIVE" },
  { label: "Bloqueado", value: "BLOCKED" },
]

export const AddUserScreen = () => {
  const navigation = useNavigation()

  const { mutate, isLoading } = usePostRequest<any, UserValidationForm>(
    "/user/create",
    {
      onSuccess: () => {
        navigation.goBack()
      },
      onError: ({ response }) => {
        console.log(response.data.message)
      },
    }
  )

  const onSubmit = (data: UserValidationForm) => {
    console.log(data)
    mutate(data)
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <UserForm loading={isLoading} onSubmit={onSubmit} />
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
  inputContainer: {
    gap: SPACING.LG,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MD,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarBoard: {
    borderBottomWidth: 1,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },
})
