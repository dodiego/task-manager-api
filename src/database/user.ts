import { User } from "@prisma/client";
import { logInfo } from "shared/logger";
import { client } from "./client";

export type UserModel = User;

export async function findUserByEmail(
  userEmail: string
): Promise<UserModel | null> {
  logInfo("Fetching user", { userEmail });
  const user = await client.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  logInfo("User fetched", { userEmail });
  return user;
}

type CreateUserInput = Pick<UserModel, "email" | "password">;
export async function createUser(input: CreateUserInput): Promise<UserModel> {
  logInfo("Creating user", input);
  const user = await client.user.create({
    data: {
      email: input.email,
      password: input.password,
    },
  });
  logInfo("User created", input);
  return user;
}
