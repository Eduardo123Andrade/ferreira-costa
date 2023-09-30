import { NavigationContainer } from "@react-navigation/native"
import {
  ApiProvider,
  HttpQueryProvider,
  StorageProvider,
  ThemeProvider,
  UserProvider,
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
    <StorageProvider>
      <UserProvider>
        <HttpQueryProvider>
          <ApiProvider>
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
          </ApiProvider>
        </HttpQueryProvider>
      </UserProvider>
    </StorageProvider>
  )
}
