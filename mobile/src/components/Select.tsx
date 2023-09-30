import { Picker } from "@react-native-picker/picker"
import { useTheme } from "../hooks"
import React from "react"

interface SelectItem {
  label: string
  value: any
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

  const backgroundColor = colors.surface

  const renderItem = (item: SelectItem) => (
    <Picker.Item
      key={item.label}
      style={{ backgroundColor }}
      color={colors.textColor}
      label={item.label}
      value={item.value}
    />
  )

  return (
    <Picker
      style={{ backgroundColor }}
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {data.map(renderItem)}
    </Picker>
  )
}
