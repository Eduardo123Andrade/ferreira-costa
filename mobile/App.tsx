import { NavigationContainer } from "@react-navigation/native"
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { AppNavigator } from "./src/navigators"
import { ApiProvider, HttpQueryProvider, ThemeProvider } from "./src/providers"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export default function App() {
  return (
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
  )
}
