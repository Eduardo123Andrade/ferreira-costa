import {
  REGEXP_FOUR_CHARACTERS_NAME,
  REGEXP_FULL_NAME_WITH_MIN_THREE_CHARACTERS,
} from "../utils"

export const validateName = (name: string) => {
  return REGEXP_FULL_NAME_WITH_MIN_THREE_CHARACTERS.test(name)
}

export const validateLogin = (name: string) => {
  return REGEXP_FOUR_CHARACTERS_NAME.test(name)
}
