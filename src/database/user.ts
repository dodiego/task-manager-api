import { User } from "@prisma/client";
import { client } from "./client";

export type UserModel = User;

export async function findUserByEmail(
  userEmail: string
): Promise<UserModel | null> {
  const user = await client.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return user;
}

type CreateUserInput = Pick<UserModel, "email" | "password">;
export async function createUser(input: CreateUserInput): Promise<UserModel> {
  const user = await client.user.create({
    data: {
      email: input.email,
      password: input.password,
    },
  });

  return user;
}
