import { useNavigation } from "@react-navigation/native"
import { UpdatePasswordForm } from "interfaces"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Button, Screen, TextInput } from "../components"
import { usePutRequest, useRecoverPassword, useUpdatePassword } from "../hooks"
import { SPACING } from "../theme"

export const UpdatePasswordScreen = () => {
  const [{ userId }] = useRecoverPassword()

  const navigation = useNavigation()

  const { handleSubmit, getFieldProps } = useUpdatePassword({ onSubmit })
  const { mutate, isLoading } = usePutRequest("/update-password", {
    onSuccess: () => {
      navigation.goBack()
    },
  })

  function onSubmit({ password }: UpdatePasswordForm) {
    mutate({ userId, password })
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
