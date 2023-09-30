import { ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type StackNavigationProps<T extends ParamListBase> =
  NativeStackNavigationProp<T>
