import { useRecoverPassword } from "../hooks"
import { Button, Screen, Text, TextInput } from "../components"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"

interface ValidateCodeScreenProps {}

export const ValidateCodeScreen: React.FC<ValidateCodeScreenProps> = (
  props
) => {
  const [code, setCode] = useState<string>()
  const [{ code: savedCode }] = useRecoverPassword()

  const onPress = () => {}

  useEffect(() => {
    setCode(`${savedCode}`)
  }, [savedCode])

  return (
    <Screen contentContainerStyles={styles.container}>
      <View style={styles.body}>
        <TextInput placeholder="Resposta" value={code} onChangeText={setCode} />

        <Button onPress={onPress}>Avançar</Button>
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
