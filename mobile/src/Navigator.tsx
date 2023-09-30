import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
// import { AuthenticatedNavigator } from './AuthenticatedNavigator'
// import { AuthenticationNavigator } from 'authentication'
// import { useUser } from "hooks"
import { HomeScreen } from "./screens"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const AppNavigator = () => {
  // const [{ user }] = useUser()

  // const initialRouteName = !!user ? "AuthenticatedNavigator" : "Authentication"

  return (
    <Stack.Navigator
      // initialRouteName={initialRouteName}
      screenOptions={screenOptions}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
