import { useNavigation } from "@react-navigation/native"
import React from "react"
import { StyleSheet, View } from "react-native"
import { StackNavigationProps } from "types"
import { Button, Screen, Text, TextInput } from "../components"
import {
  useLoginValidationForm,
  usePostRequest,
  useResponseModal,
  useTheme,
} from "../hooks"
import { LoginValidationForm } from "../interfaces"
import { SimpleModal } from "../modals"
import { SPACING } from "../theme"

type RootStackParamList = {
  AuthenticatedNavigator: undefined
  RecoverPasswordNavigator: undefined
  AddUserScreen: undefined
}

type LoginScreenNavigationProp = StackNavigationProps<RootStackParamList>

export const LoginScreen = () => {
  const [{ colors }] = useTheme()
  const [{ show, message }, { startModalResponse, resetState }] =
    useResponseModal()
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const { mutate, isLoading } = usePostRequest("/login", {
    onSuccess: () => {
      navigation.replace("AuthenticatedNavigator")
    },
    onError: ({ response }) => {
      startModalResponse(response.data.message)
    },
  })

  const { handleSubmit, getFieldProps } = useLoginValidationForm({
    onSubmit,
  })

  function onSubmit(data: LoginValidationForm) {
    mutate(data)
  }

  const goToSingIn = () => navigation.navigate("AddUserScreen")

  const goToRecoverPassword = () =>
    navigation.navigate("RecoverPasswordNavigator")

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
