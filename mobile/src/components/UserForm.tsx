import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { UserStatus } from "types"
import { useUserValidationForm } from "../hooks"
import { UserValidationForm } from "../interfaces"
import { SPACING } from "../theme"
import { TextInput } from "./TextInput"
import { InputDate } from "./InputDate"
import { Select } from "./Select"
import { Text } from "./Text"
import { Button } from "./Button"

interface UserFormProps {
  initialValues?: UserValidationForm
  isEdit?: boolean
  loading: boolean
  onSubmit: (data: UserValidationForm) => void
}

const statusList = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Inativo", value: "INACTIVE" },
  { label: "Bloqueado", value: "BLOCKED" },
]

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  isEdit,
  loading,
  onSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(initialValues.birthdate)
  )
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>("ACTIVE")

  const { getFieldProps, handleSubmit } = useUserValidationForm({
    initialValues,
    isEdit,
    onSubmit,
  })

  const { onChangeText } = getFieldProps("birthdate")
  const { onChangeText: onChangeTextStatus } = getFieldProps("status")

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
    onChangeText(date.toISOString())
  }

  const onValueChange = (value: UserStatus) => {
    setSelectedStatus(value)
    onChangeTextStatus(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Nome" {...getFieldProps("name")} />
        <TextInput placeholder="Nome da mãe" {...getFieldProps("motherName")} />

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

        {!isEdit && (
          <TextInput
            placeholder="Senha"
            secureTextEntry
            {...getFieldProps("password")}
          />
        )}

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

      <Button isLoading={loading} onPress={handleSubmit}>
        Adicionar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})
