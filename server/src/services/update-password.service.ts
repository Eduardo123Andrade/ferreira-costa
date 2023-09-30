import { UpdatePassword } from "../interfaces"
import prisma from "../lib/prisma"
import { encoder } from "../utils"

const update = async (data: UpdatePassword) => {
  const password = await encoder.codify(data.password)

  await prisma.user.update({
    where: { id: data.userId },
    data: { password },
  })
}

export const UpdatePasswordService = {
  update,
}
