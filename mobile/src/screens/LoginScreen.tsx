import {
  useLoginValidationForm,
  usePostRequest,
  useTheme,
  useUserValidationForm,
} from "../hooks"
import { Button, Screen, Text, TextInput } from "../components"
import React from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { LoginValidationForm } from "../interfaces"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProps } from "types"

type RootStackParamList = {
  HomeScreen: undefined
  RecoverPasswordNavigator: undefined
}

type LoginScreenNavigationProp = StackNavigationProps<RootStackParamList>

export const LoginScreen = () => {
  const [{ colors }] = useTheme()
  const navigation = useNavigation<LoginScreenNavigationProp>()

  const { mutate, isLoading } = usePostRequest("/login", {
    onSuccess: () => {
      navigation.replace("HomeScreen")
    },
    onError: ({ response }) => {
      console.log(response.data.message)
    },
  })

  const { handleSubmit, getFieldProps } = useLoginValidationForm({
    onSubmit,
  })

  function onSubmit(data: LoginValidationForm) {
    mutate(data)
  }

  const goToLogin = () => {}

  const goToSingIn = () => {}

  const goToRecoverPassword = () => {}

  return (
    <Screen contentContainerStyles={styles.container}>
      <View style={[styles.bodyContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Login" {...getFieldProps("login")} />
          <TextInput
            secureTextEntry
            placeholder="Password"
            {...getFieldProps("password")}
          />
        </View>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Entrar
        </Button>

        <View style={styles.textContainer}>
          <Text color={colors.secondaryLight} onPress={goToRecoverPassword}>
            Recuperar Senha
          </Text>
          <Text color={colors.secondaryLight} onPress={goToSingIn}>
            Cadastrar
          </Text>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
  bodyContainer: {
    padding: SPACING.MD,
  },
  inputContainer: {
    gap: SPACING.MD,
    paddingBottom: SPACING.LG,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.XL,
  },
})
