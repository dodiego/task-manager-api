import config from "config";
import { createSigner, createVerifier } from "fast-jwt";

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

export async function generateUserToken(
  input: TokenPayload
): Promise<{ token: string }> {
  const token = tokenSigner(input);
  return { token };
}

export async function getUserDataFromToken(
  userToken: string
): Promise<TokenPayload> {
  const payload = tokenVerifier(userToken);
  return payload;
}
