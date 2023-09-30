import { NavigationContainer } from "@react-navigation/native"
import {
  ApiProvider,
  HttpQueryProvider,
  StorageProvider,
  ThemeProvider,
  UsersProvider,
} from "./src/providers"
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { AppNavigator } from "./src/Navigator"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export default function App() {
  return (
    <HttpQueryProvider>
      <ApiProvider>
        <UsersProvider>
          <ThemeProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                  name="AppNavigator"
                  component={AppNavigator}
                  options={screenOptions}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </UsersProvider>
      </ApiProvider>
    </HttpQueryProvider>
  )
}
