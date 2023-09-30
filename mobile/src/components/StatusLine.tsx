import { StyleSheet, View } from "react-native"
import { UserStatus } from "types"
import { translateUserStatus } from "../utils"
import { Text } from "./Text"
import { SPACING } from "../theme"
import { useTheme } from "../hooks"

interface StatusProps {
  status: UserStatus
}

export const StatusLine = ({ status }: StatusProps) => {
  const statusData = translateUserStatus(status)
  const [{ colors }] = useTheme()

  const statusColor = {
    ACTIVE: colors.success,
    INACTIVE: colors.disabled,
    BLOCKED: colors.error,
  }

  return (
    <View style={styles.container}>
      <Text bold>Status: </Text>
      <Text bold color={statusColor[status]}>
        {statusData}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.XS,
    flex: 5,
  },
})
