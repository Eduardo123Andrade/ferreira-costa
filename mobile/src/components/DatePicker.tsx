import React from "react"
import { StyleSheet, Text, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

interface DatePickerProps {}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <DateTimePicker
      // onChange={(event) => console.log({ event })}
      onChange={(_, date) => console.log(date)}
      display="calendar"
      value={new Date()}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
})
