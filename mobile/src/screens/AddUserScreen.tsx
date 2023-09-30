import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import {
  Button,
  InputDate,
  TextInput,
  Screen,
  Text,
  Select,
} from "../components/"
import { SPACING } from "../theme"
import { useUserValidationForm } from "../hooks"
import { UserValidationForm } from "../interfaces"
import { ScrollView } from "react-native-gesture-handler"
import { UserStatus } from "types"

const statusList = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Inativo", value: "INACTIVE" },
  { label: "Bloqueado", value: "BLOCKED" },
]

export const AddUserScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>("ACTIVE")

  const { getFieldProps, handleSubmit } = useUserValidationForm({
    onSubmit,
  })

  const { onChangeText } = getFieldProps("birthdate")
  const { onChangeText: onChangeTextStatus } = getFieldProps("status")

  function onSubmit(data: UserValidationForm) {
    console.log(data)
  }

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
    onChangeText(date.toISOString())
  }

  const onValueChange = (value: UserStatus) => {
    setSelectedStatus(value)
    onChangeTextStatus(value)
  }

  const onPress = () => {
    console.log("????")
    handleSubmit()
  }

  return (
    <Screen contentContainerStyles={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nome" {...getFieldProps("name")} />
          <TextInput
            placeholder="Nome da mãe"
            {...getFieldProps("motherName")}
          />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            {...getFieldProps("email")}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="CPF"
            {...getFieldProps("cpf")}
          />
          <TextInput placeholder="Login" {...getFieldProps("login")} />

          <TextInput placeholder="Telefone" {...getFieldProps("phone")} />

          <TextInput
            placeholder="Senha"
            secureTextEntry
            {...getFieldProps("password")}
          />

          <View style={[styles.calendarContainer]}>
            <InputDate
              selectedDate={selectedDate}
              label="Data de nascimento"
              onSelectDate={onSelectDate}
            />
          </View>
        </View>

        <View>
          <Text>Status:</Text>
          <Select
            selectedValue={selectedStatus}
            data={statusList}
            onValueChange={onValueChange}
          />
        </View>

        <Button onPress={onPress}>Adicionar</Button>
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
