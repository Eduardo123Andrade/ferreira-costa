import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import { PersonalInfoQuestionScreen, ValidateCodeScreen } from "../screens"
import { RecoverPasswordProvider } from "../providers"

const Stack = createNativeStackNavigator()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const RecoverPasswordNavigator = () => {
  return (
    <RecoverPasswordProvider>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="PersonalInfoQuestionScreen"
          component={PersonalInfoQuestionScreen}
        />
        <Stack.Screen
          name="ValidateCodeScreen"
          component={ValidateCodeScreen}
        />
      </Stack.Navigator>
    </RecoverPasswordProvider>
  )
}
