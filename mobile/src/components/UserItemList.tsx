import { User } from "../interfaces"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "./Text"
import { SPACING } from "../theme"
import { StatusLine } from "./StatusLine"

interface UserItemListProps {
  user: User
}

interface LineProps {
  field: string
  label: string
}

const Line = ({ field, label }: LineProps) => {
  return (
    <View style={styles.line}>
      <Text bold>{`${field}:`}</Text>
      <Text>{label}</Text>
    </View>
  )
}

export const UserItemList: React.FC<UserItemListProps> = ({ user }) => {
  return (
    <View style={[styles.container]}>
      <View>
        <View style={styles.bodyLine}>
          <Line field="Nome" label={user.name} />
          <Line field="Email" label={user.email} />
        </View>
        <View style={styles.bodyLine}>
          <Line field="Telefone" label={user.phone} />
          <Line field="CPF" label={user.cpf} />
        </View>
        <View style={styles.bodyLine}>
          <StatusLine status={user.status} />
          <Line field="Nome da mãe" label={user.motherName} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.MD,
    paddingTop: SPACING.XS,
  },
  line: {
    flexDirection: "row",
    gap: SPACING.XS,
    flex: 5,
    flexWrap: "wrap",
  },
  bodyLine: {
    flexDirection: "row",
    paddingTop: SPACING.SM,
  },
})
