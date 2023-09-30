import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Screen, Select, TextInput } from "../components"
import {
  useGetRequest,
  usePostRequest,
  useRecoverPassword,
  useResponseModal,
} from "../hooks"
import { SimpleModal } from "../modals"
import { SPACING } from "../theme"
import { StackNavigationProps } from "../types"

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
  const [{ show, message }, { startModalResponse, resetState }] =
    useResponseModal()
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
      startModalResponse(response.data.message)
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
