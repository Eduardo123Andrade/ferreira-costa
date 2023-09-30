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

  const onValueChange = (value: string) => {
    setSelectedStatus(value)
  }

  useEffect(() => {
    console.log({ selectedStatus })
  }, [selectedStatus])

  return (
    <BottomSheet {...props}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nome" />
          <TextInput keyboardType="numeric" placeholder="CPF" />
          <TextInput placeholder="Login" />

          <View style={styles.calendarContainer}>
            <View style={styles.line}>
              <Text>Maior que:</Text>
              <TextInput keyboardType="numeric" placeholder="00" />
            </View>

            <View style={styles.line}>
              <Text>Menor que:</Text>
              <TextInput keyboardType="numeric" placeholder="00" />
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <View style={styles.line}>
              <Text>Criado em:</Text>
              <Icon name="calendar-today" onPress={console.log} />
            </View>

            <View style={styles.line}>
              <Text>Atualizado em:</Text>
              <Icon name="calendar-today" onPress={console.log} />
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

        {/* <DatePicker /> */}
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
