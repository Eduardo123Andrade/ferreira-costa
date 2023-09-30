import bcrypt from "bcrypt";

const codify = async (password: string): Promise<string> => {
  const salts = 10;
  const result = await bcrypt.hash(password, salts)

  return result;
};


const verifyPassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, encryptedPassword)
  return result;
}

export const encoder = {
  codify,
  verifyPassword
}