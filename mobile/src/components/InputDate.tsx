import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { SPACING } from "../theme"
import { DatePicker } from "./DatePicker"

interface InputDateProps {
  label: string
  onSelectDate: (date: Date) => void
}

export const InputDate: React.FC<InputDateProps> = ({
  label,
  onSelectDate,
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
    <>
      <View style={styles.container}>
        <Text>{label}</Text>
        <Icon name="calendar-today" onPress={onOpenDatePicker} />
      </View>
      {openDatePicker && <DatePicker selectDate={_onSelectDate} />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.SM,
  },
})
