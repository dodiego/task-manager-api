import casual from "casual";
import { generateAccessToken, hashString } from "core/utils/crypto";
import { ValidationError } from "core/utils/validate-json-schema";
import { mockDeep } from "jest-mock-extended";
import { signUpFactory, SignUpInput, Dependencies } from "./sign-up";

describe("Sign Up", () => {
  const mockedDependencies = mockDeep<Dependencies>();

  const signUp = signUpFactory(mockedDependencies);

  beforeEach(() => {
    mockedDependencies.generateAccessToken.mockImplementation(
      generateAccessToken
    );
    mockedDependencies.hashString.mockImplementation(hashString);
    jest.clearAllMocks();
  });
  it("Should succeed with valid inputs", async () => {
    const password = casual.password;
    const input: SignUpInput = {
      email: casual.email,
      password,
      confirmPassword: password,
    };

    mockedDependencies.createUser.mockResolvedValue({
      id: casual.uuid,
      email: input.email,
      password: casual.catch_phrase,
    });

    const result = await signUp(input);

    const { hashedInput: hashedPassword } = await mockedDependencies.hashString
      .mock.results[0].value;
    const { token: generatedAccessToken } = await mockedDependencies
      .generateAccessToken.mock.results[0].value;

    expect(mockedDependencies.createUser).toHaveBeenCalledWith({
      email: input.email,
      password: hashedPassword,
    });
    expect(result.accessToken).toBe(generatedAccessToken);
  });

  it("Should fail if email is null", async () => {
    const password = casual.password;
    const promise = signUp({
      email: null,
      password,
      confirmPassword: password,
    } as any);

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if email is empty", async () => {
    const password = casual.password;
    const promise = signUp({
      email: "",
      password,
      confirmPassword: password,
    });

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if email is invalid", async () => {
    const password = casual.password;
    const promise = signUp({
      email: "invalid email",
      password,
      confirmPassword: password,
    });

    await expect(promise).rejects.toThrowError(
      "'email' is a required string and must be a valid email"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if password have less than 6 characters", async () => {
    const password = "12345";
    const promise = signUp({
      email: casual.email,
      password,
      confirmPassword: password,
    });

    await expect(promise).rejects.toThrowError(
      "'password' is a required string with at least 6 characters and at most 100 characters"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if password have more than 100 characters", async () => {
    const password = casual.words(20);
    const promise = signUp({
      email: casual.email,
      password,
      confirmPassword: password,
    });

    await expect(promise).rejects.toThrowError(
      "'password' is a required string with at least 6 characters and at most 100 characters"
    );
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if 'password' and 'confirmPassword' are not equal", async () => {
    const promise = signUp({
      email: casual.email,
      password: casual.password,
      confirmPassword: casual.password,
    });

    await expect(promise).rejects.toThrowError("Passwords are not equal");
    await expect(promise).rejects.toBeInstanceOf(ValidationError);
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });

  it("Should fail if email is already used", async () => {
    const password = casual.password;
    const input: SignUpInput = {
      email: casual.email,
      password,
      confirmPassword: password,
    };

    mockedDependencies.findUserByEmail.mockResolvedValue({
      email: casual.email,
      password: casual.password,
      id: casual.uuid,
    });

    const promise = signUp(input);

    await expect(promise).rejects.toThrowError("This email is already used");
    expect(mockedDependencies.createUser).not.toHaveBeenCalled();
  });
});
