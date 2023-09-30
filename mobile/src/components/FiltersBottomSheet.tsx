import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SPACING } from "../theme"
import { BottomSheet } from "./BottomSheet"
import { Button } from "./Button"
import { TextInput } from "./TextInput"
import { Select } from "./Select"
import { Text } from "./Text"
import { DatePicker } from "./DatePicker"
import { Icon } from "./Icon"

interface FilterBottomSheetProps {
  visible: true
  onRequestClose: () => void
}

const statusList = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Inativo", value: "INACTIVE" },
  { label: "Bloqueado", value: "BLOQUED" },
]

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = (props) => {
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [name, setName] = useState<string>()
  const [cpf, setCpf] = useState<string>()
  const [login, setLogin] = useState<string>()
  const [biggerThen, setBiggerThen] = useState<number>()
  const [lessThan, setLessThan] = useState<number>()

  const [createdAt, setCreatedAt] = useState<Date>()
  const [updatedAt, setUpdatedAt] = useState<Date>()
  const [openCreatedAtDatePicker, setOpenCreatedAtDatePicker] = useState(false)
  const [openUpdateAtDatePicker, setOpenUpdateAtDatePicker] = useState(false)

  const onValueChange = (value: string) => {
    setSelectedStatus(value)
  }

  const onOpenCreatedAtDatePicker = () => {
    setOpenCreatedAtDatePicker(true)
  }

  const onSelectCreatedAtDatePicker = (date: Date) => {
    setOpenCreatedAtDatePicker(false)
    setCreatedAt(date)
  }

  const onOpenUpdatedAtDatePicker = () => {
    setOpenUpdateAtDatePicker(true)
  }

  const onSelectUpdatedAtDatePicker = (date: Date) => {
    setOpenUpdateAtDatePicker(false)
    setUpdatedAt(date)
  }

  const onSetBiggerThen = (text: string) => {
    setBiggerThen(Number(text ?? 0))
  }

  const onSetLessThan = (text: string) => {
    setLessThan(Number(text ?? 0))
  }

  useEffect(() => {
    console.log({
      biggerThen,
      lessThan,
      name,
      cpf,
      login,
      selectedStatus,
      createdAt,
      updatedAt,
    })
  }, [
    biggerThen,
    lessThan,
    name,
    cpf,
    login,
    selectedStatus,
    createdAt,
    updatedAt,
  ])

  return (
    <BottomSheet {...props}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput value={name} onChangeText={setName} placeholder="Nome" />
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

          <View style={styles.calendarContainer}>
            <View style={styles.line}>
              <Text>Maior que:</Text>
              <TextInput
                value={`${biggerThen ?? 0}`}
                onChangeText={onSetBiggerThen}
                keyboardType="numeric"
                placeholder="00"
              />
            </View>

            <View style={styles.line}>
              <Text>Menor que:</Text>
              <TextInput
                value={`${lessThan ?? 0}`}
                onChangeText={onSetLessThan}
                keyboardType="numeric"
                placeholder="00"
              />
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <View style={styles.line}>
              <Text>Criado em:</Text>
              <Icon name="calendar-today" onPress={onOpenCreatedAtDatePicker} />
            </View>

            <View style={styles.line}>
              <Text>Atualizado em:</Text>
              <Icon name="calendar-today" onPress={onOpenUpdatedAtDatePicker} />
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
        </View>

        <Button>Buscar</Button>

        {openCreatedAtDatePicker && (
          <DatePicker selectDate={onSelectCreatedAtDatePicker} />
        )}
        {openUpdateAtDatePicker && (
          <DatePicker selectDate={onSelectUpdatedAtDatePicker} />
        )}
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
    // flex: 5,
  },
})
