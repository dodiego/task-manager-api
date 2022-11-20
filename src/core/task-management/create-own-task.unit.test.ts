jest.mock("database");
import casual from "casual";
import { generateUserToken } from "auth";
import {
  createOwnTaskFactory,
  CreateOwnTaskInput,
  CreateOwnTaskOutput,
  Dependencies,
} from "./create-own-task";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrivateHandler } from "core/shared/base";
import { ValidationError } from "core/shared/validate-json-schema";

describe("Create Own Task", () => {
  let userToken: string;
  let userId: string;
  let mockedDependencies: DeepMockProxy<Dependencies>;
  let createOwnTask: PrivateHandler<CreateOwnTaskInput, CreateOwnTaskOutput>;
  beforeEach(async () => {
    mockedDependencies = mockDeep();

    createOwnTask = createOwnTaskFactory(mockedDependencies);
    userId = casual.uuid;
    const result = await generateUserToken({
      userId,
    });
    userToken = result.token;
  });
  it("Should succeed to create own task using valid inputs", async () => {
    const payload: CreateOwnTaskInput = {
      taskTitle: casual.title,
      taskDescription: casual.description,
      taskCategoryId: casual.uuid,
    };
    mockedDependencies.getUserDataFromToken.mockResolvedValue({
      userId,
    });
    await createOwnTask(userToken, payload);
    expect(mockedDependencies.createTask).toHaveBeenCalledWith({
      title: payload.taskTitle,
      description: payload.taskDescription,
      userId,
      taskCategoryId: payload.taskCategoryId,
    });
  });

  it("Should fail to create own task if title is null", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    } as any);

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail to create own task if title is empty", async () => {
    const result = createOwnTask(userToken, {
      taskTitle: "",
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });

  it("Should fail to create own task if title is bigger than 300 characters", async () => {
    const result = createOwnTask(userToken, {
      taskCategoryId: casual.uuid,
      taskDescription: casual.description,
      taskTitle: casual.words(60),
    });

    await expect(result).rejects.toThrowError(
      "'taskTitle' is a required string with have at least 1 character and at most 300 characters"
    );
    expect(result).rejects.toBeInstanceOf(ValidationError);
  });
});
