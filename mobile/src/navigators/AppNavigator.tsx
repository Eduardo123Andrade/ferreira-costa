import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { AddUserScreen, HomeScreen, UpdateUserScreen } from "../screens"
import { AuthenticationNavigator } from "./AuthenticationNavigator"
import { AuthenticatedNavigator } from "./AuthenticatedNavigator"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="AuthenticationNavigator"
        component={AuthenticationNavigator}
      />
      <Stack.Screen
        name="AuthenticatedNavigator"
        component={AuthenticatedNavigator}
      />

      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} /> */}
    </Stack.Navigator>
  )
}
