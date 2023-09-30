import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { SPACING } from "../theme"
import { DatePicker } from "./DatePicker"

interface InputDateProps {
  label: string
  onSelectDate: (date: Date) => void
  selectedDate?: Date
}

const formatDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

export const InputDate: React.FC<InputDateProps> = ({
  label,
  onSelectDate,
  selectedDate,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false)

  const onOpenDatePicker = () => {
    setOpenDatePicker(true)
  }

  const _onSelectDate = (date: Date) => {
    setOpenDatePicker(false)
    onSelectDate(date)
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>{label}</Text>
        <Icon name="calendar-today" onPress={onOpenDatePicker} />
      </View>
      {!!selectedDate && <Text>{formatDate(selectedDate)}</Text>}
      {openDatePicker && <DatePicker selectDate={_onSelectDate} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },
})
