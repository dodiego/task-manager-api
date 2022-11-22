import casual from "casual";
import { generateAccessToken, hashString, verifyHash } from "core/utils/crypto";
import { mock } from "jest-mock-extended";
import { Dependencies, signInFactory, SignInInput } from "./sign-in";

describe("Sign In", () => {
  const mockedDependencies = mock<Dependencies>();
  const signIn = signInFactory(mockedDependencies);

  beforeEach(() => {
    mockedDependencies.generateAccessToken.mockImplementation(
      generateAccessToken
    );
    mockedDependencies.verifyHash.mockImplementation(verifyHash);
    jest.clearAllMocks();
  });
  it("Should succeed with valid input", async () => {
    const input: SignInInput = {
      email: casual.email,
      password: casual.password,
    };

    const { hashedInput: hashedPassword } = await hashString(input.password);
    mockedDependencies.findUserByEmail.mockResolvedValue({
      email: input.email,
      id: casual.uuid,
      password: hashedPassword,
    });

    const result = await signIn(input);

    const { token: accessToken } = await mockedDependencies.generateAccessToken
      .mock.results[0].value;
    expect(result.accessToken).toBe(accessToken);
  });

  it("Should fail if email is invalid", async () => {
    const promise = signIn({
      email: "invalid email",
      password: casual.password,
    });

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    expect(mockedDependencies.findUserByEmail).not.toHaveBeenCalled();
  });

  it("Should fail if email is empty", async () => {
    const promise = signIn({
      email: "",
      password: casual.password,
    });

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    expect(mockedDependencies.findUserByEmail).not.toHaveBeenCalled();
  });

  it("Should fail if email is null", async () => {
    const promise = signIn({
      email: null,
      password: casual.password,
    } as any);

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    expect(mockedDependencies.findUserByEmail).not.toHaveBeenCalled();
  });

  it("Should fail if email is null", async () => {
    const promise = signIn({
      email: null,
      password: casual.password,
    } as any);

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    expect(mockedDependencies.findUserByEmail).not.toHaveBeenCalled();
  });

  it("Should fail if user does not exist", async () => {
    const promise = signIn({
      email: casual.email,
      password: casual.password,
    });

    mockedDependencies.findUserByEmail.mockResolvedValue(null);

    await expect(promise).rejects.toThrowError(
      "Invalid email / password combination"
    );
  });

  it("Should fail if user password hash is incompatible", async () => {
    const input = {
      email: casual.email,
      password: casual.password,
    };

    const { hashedInput: otherHashedPassword } = await hashString(input.email);
    mockedDependencies.findUserByEmail.mockResolvedValue({
      email: input.email,
      id: casual.uuid,
      password: otherHashedPassword,
    });
    const promise = signIn(input);

    await expect(promise).rejects.toThrowError(
      "Invalid email / password combination"
    );
  });
});
