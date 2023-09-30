import { Picker } from "@react-native-picker/picker"
import { useTheme } from "../hooks"
import React from "react"
import { StyleSheet } from "react-native"

interface SelectItem {
  label: string
  value: string
}

interface SelectProps {
  data: SelectItem[]
  selectedValue: any
  onValueChange: (item: any, index: number) => void
}

export const Select: React.FC<SelectProps> = ({
  data,
  selectedValue,
  onValueChange,
}: SelectProps) => {
  const [{ colors }] = useTheme()

  const renderItem = (item: SelectItem) => (
    <Picker.Item
      key={item.value}
      style={{ backgroundColor: colors.surface }}
      color={colors.textColor}
      label={item.label}
      value={item.value}
    />
  )

  return (
    <Picker
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {data.map(renderItem)}
    </Picker>
  )
}

const styles = StyleSheet.create({
  container: {},
})
