import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { UsersProvider } from "../providers"
import { AddUserScreen, HomeScreen, UpdateUserScreen } from "../screens"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const AuthenticatedNavigator = () => {
  return (
    <UsersProvider>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
        <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
      </Stack.Navigator>
    </UsersProvider>
  )
}
