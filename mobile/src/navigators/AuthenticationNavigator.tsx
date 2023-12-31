import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { AddUserScreen, LoginScreen } from "../screens"
import { RecoverPasswordNavigator } from "./RecoverPasswordNavigator"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="RecoverPasswordNavigator"
        component={RecoverPasswordNavigator}
      />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
    </Stack.Navigator>
  )
}
