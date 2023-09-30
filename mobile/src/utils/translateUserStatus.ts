import { UserStatus } from "types"

const TRANSLATE = {
  ACTIVE: "ATIVO",
  INACTIVE: "INATIVO",
  BLOCKED: "BLOQUEADO",
}

export const translateUserStatus = (status: UserStatus) => TRANSLATE[status]
