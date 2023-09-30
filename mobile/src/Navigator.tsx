import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
// import { AuthenticatedNavigator } from './AuthenticatedNavigator'
// import { AuthenticationNavigator } from 'authentication'
// import { useUser } from "hooks"
import { AddUserScreen, HomeScreen, UpdateUserScreen } from "./screens"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const AppNavigator = () => {
  // const [{ user }] = useUser()

  // const initialRouteName = !!user ? "AuthenticatedNavigator" : "Authentication"

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />

      {/* {!user ? (
        <Stack.Screen
          name="Authentication"
          component={AuthenticationNavigator}
          options={screenOptions}
        />
      ) : (
        <Stack.Screen
          name="AuthenticatedNavigator"
          component={AuthenticatedNavigator}
          options={screenOptions}
        />
      )} */}
    </Stack.Navigator>
  )
}
