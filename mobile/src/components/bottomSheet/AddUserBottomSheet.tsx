import React, { useEffect, useState } from "react"
import { Easing, StyleSheet, View } from "react-native"
import { SPACING } from "../../theme"
import { BottomSheet } from "./BottomSheet"
import { Button } from "../Button"
import { TextInput } from "../TextInput"
import { Text } from "../Text"
import { DatePicker } from "../DatePicker"
import { useUsers } from "../../hooks"
import { UserStatus } from "../../types"
import { InputDate } from "../InputDate"

interface AddUserBottomSheetProps {
  visible: boolean
  onRequestClose: () => void
}

export const AddUserBottomSheet: React.FC<AddUserBottomSheetProps> = (
  props
) => {
  const [name, setName] = useState<string>()
  const [login, setLogin] = useState<string>()
  const [cpf, setCpf] = useState<string>()
  const [motherName, setMotherName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [selectedDate, setSelectedDate] = useState(new Date())

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
  }

  const onSaveFilter = () => {
    console.log({
      name,
      login,
      cpf,
      motherName,
      email,
      phone,
      password,
    })
    props.onRequestClose()
  }

  return (
    <BottomSheet {...props}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput value={name} onChangeText={setName} placeholder="Nome" />
          <TextInput
            value={motherName}
            onChangeText={setMotherName}
            placeholder="Nome da mãe"
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            placeholder="CPF"
          />
          <TextInput
            value={login}
            onChangeText={setLogin}
            placeholder="Login"
          />

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefone"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
          />

          <View style={styles.calendarContainer}>
            <InputDate label="Data de nascimento" onSelectDate={onSelectDate} />
          </View>
        </View>

        <Button onPress={onSaveFilter}>Adicionar</Button>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    gap: SPACING.LG,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.MD,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },
})
