import { User } from "@prisma/client";

export interface CreateUser
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
