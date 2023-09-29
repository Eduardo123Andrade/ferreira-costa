import { colors } from './colors'

export interface Theme {
  background: string
  buttonLabel: string
  disabled: string
  error: string
  lightIcon: string
  placeholder: string
  primary: string
  secondary: string
  secondaryLight: string
  surface: string
  textColor: string
}

const dark: Theme = {
  background: colors.gray[900],
  buttonLabel: colors.gray[100],
  disabled: colors.blue[300],
  error: colors.red[600],
  lightIcon: colors.gray[400],
  placeholder: colors.gray[700],
  primary: colors.gray[900],
  secondary: colors.blue[900],
  secondaryLight: colors.blue[400],
  surface: colors.gray[800],
  textColor: colors.gray[500],
}

export const THEMES = {
  dark,
  light: dark,
}
