import { useGetRequest, useRecoverPassword, useResponseModal } from "../hooks"
import { Button, Screen, Text, TextInput } from "../components"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProps } from "../types"
import { SimpleModal } from "../modals"

type RootStackParamList = {
  UpdatePasswordScreen: undefined
}

type ValidateCodeScreenNavigationProp = StackNavigationProps<RootStackParamList>

export const ValidateCodeScreen = () => {
  const [code, setCode] = useState<string>()
  const [{ code: savedCode, userId }] = useRecoverPassword()
  const [enabled, setEnabled] = useState(false)
  const [{ show, message }, { startModalResponse, resetState }] =
    useResponseModal()

  const navigation = useNavigation<ValidateCodeScreenNavigationProp>()

  const { isLoading } = useGetRequest(`/validate/${savedCode}/${userId}`, {
    enabled,
    onSuccess: () => {
      setEnabled(false)
      navigation.replace("UpdatePasswordScreen")
    },
    onError: ({ message }) => {
      startModalResponse(message)
    },
  })

  const onPress = () => {
    setEnabled(true)
  }

  useEffect(() => {
    setCode(`${savedCode}`)
  }, [savedCode])

  return (
    <Screen contentContainerStyles={styles.container}>
      <View style={styles.body}>
        <TextInput placeholder="Resposta" value={code} onChangeText={setCode} />

        <Button
          disabled={!savedCode && !userId}
          isLoading={isLoading}
          onPress={onPress}
        >
          Avançar
        </Button>
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
    paddingBottom: SPACING.XL,
  },
  body: {
    gap: SPACING.XL * 2,
    padding: SPACING.MD,
  },
})
