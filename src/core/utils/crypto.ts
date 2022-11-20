import config from "shared/config";
import { createSigner, createVerifier } from "fast-jwt";
import { logError } from "shared/logger";

export type TokenPayload = {
  userId: string;
};

const millisecondsInOneHour = 1000 * 60 * 60;

const tokenSigner = createSigner({
  key: config.apiSecret,
  expiresIn: millisecondsInOneHour,
});
const tokenVerifier = createVerifier({
  key: config.apiSecret,
  cache: true,
});
export class AuthenticationError extends Error {}
export async function generateUserToken(
  input: TokenPayload
): Promise<{ token: string }> {
  const token = tokenSigner(input);
  return { token };
}

export async function getUserDataFromToken(
  userToken: string
): Promise<TokenPayload> {
  try {
    const payload = tokenVerifier(userToken);
    return payload;
  } catch (error) {
    logError(error);
    throw new AuthenticationError("Invalid token");
  }
}
