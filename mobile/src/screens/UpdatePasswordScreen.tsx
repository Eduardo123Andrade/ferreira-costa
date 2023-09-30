import { usePutRequest, useRecoverPassword, useUpdatePassword } from "../hooks"
import { Button, Screen, Text, TextInput } from "../components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { UpdatePasswordForm } from "interfaces"
import { StackNavigationProps } from "types"
import { useNavigation } from "@react-navigation/native"

type RootStackParamList = {
  AppNavigator: undefined
  PersonalInfoQuestionScreen: undefined
}

type UpdatePasswordScreenNavigationProp =
  StackNavigationProps<RootStackParamList>

export const UpdatePasswordScreen = () => {
  const [{ userId }] = useRecoverPassword()

  const navigation = useNavigation<UpdatePasswordScreenNavigationProp>()

  const { handleSubmit, getFieldProps } = useUpdatePassword({ onSubmit })
  const { mutate, isLoading } = usePutRequest("/update-password", {
    onSuccess: () => {
      console.log("olar")
    },
  })

  function onSubmit({ password }: UpdatePasswordForm) {
    console.log("??")
    navigation.goBack()
    // mutate({
    //   userId,
    //   password,
    // })
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <View style={styles.body}>
        <TextInput
          secureTextEntry
          placeholder="Senha"
          {...getFieldProps("password")}
        />

        <Button isLoading={isLoading} onPress={handleSubmit}>
          Avançar
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    paddingBottom: SPACING.XL,
  },
  body: {
    gap: SPACING.XL * 2,
    padding: SPACING.MD,
  },
})
