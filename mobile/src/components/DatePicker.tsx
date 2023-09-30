import React from "react"
import DateTimePicker from "@react-native-community/datetimepicker"

interface DatePickerProps {
  selectDate: (date: Date) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectDate }) => {
  const onChange = (_: any, date: Date) => {
    selectDate(date)
  }

  return (
    <DateTimePicker
      onAccessibilityEscape={console.log}
      onChange={onChange}
      display="calendar"
      value={new Date()}
    />
  )
}
