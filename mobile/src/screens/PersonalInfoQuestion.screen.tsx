import { useGetRequest, usePostRequest } from "../hooks"
import { Button, Screen, Select, Text, TextInput } from "../components"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { useRecoverPassword } from "../hooks"
import { StackNavigationProps } from "types"
import { useNavigation } from "@react-navigation/native"

interface QuestionOption {
  id: string
  question: string
}

interface QuestionOptions {
  label: string
  value: QuestionOption
}

type RootStackParamList = {
  ValidateCodeScreen: undefined
}

type PersonalInfoQuestionScreenNavigationProp =
  StackNavigationProps<RootStackParamList>

export const PersonalInfoQuestionScreen = () => {
  const [questionOptions, setQuestionOptions] = useState<QuestionOptions[]>([])
  const [questionId, setQuestionId] = useState<string>()
  const [answer, setAnswer] = useState<string>()

  const [, { setData }] = useRecoverPassword()

  const navigation = useNavigation<PersonalInfoQuestionScreenNavigationProp>()

  useGetRequest<QuestionOption[]>("/personal-info-question", {
    onSuccess: ({ data }) => {
      const mappedOptions: QuestionOptions[] = data.map((item) => {
        return {
          label: item.question,
          value: item,
        }
      })

      setQuestionOptions(mappedOptions)
    },
  })

  const { mutate } = usePostRequest("/personal-info-answer", {
    onSuccess: ({ data }) => {
      setData(data)
      navigation.navigate("ValidateCodeScreen")
    },
    onError: ({ response }) => {
      console.log(response.data.message)
    },
  })

  const onSelectValue = (value: QuestionOption) => {
    setQuestionId(value.id)
  }

  const onPress = () => {
    mutate({
      id: questionId,
      answer,
    })
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <View style={styles.body}>
        <Select
          data={questionOptions}
          onValueChange={onSelectValue}
          selectedValue={questionOptions}
        />
        <TextInput
          placeholder="Resposta"
          value={answer}
          onChangeText={setAnswer}
        />

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
