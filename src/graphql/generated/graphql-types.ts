import { GraphQLResolveInfo } from "graphql";
import { GraphQlContext } from "graphql/context";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArchiveTaskInput = {
  taskId: Scalars["ID"];
};

export type ArchiveTaskOutput =
  | ArchiveTaskSuccessOutput
  | AuthenticationError
  | BusinessRuleError
  | UnknownError
  | ValidationError;

export type ArchiveTaskSuccessOutput = {
  __typename?: "ArchiveTaskSuccessOutput";
  task: Task;
};

export type AuthenticationError = BaseError & {
  __typename?: "AuthenticationError";
  message: Scalars["String"];
};

export type AuthenticationOutput = {
  __typename?: "AuthenticationOutput";
  accessToken: Scalars["String"];
};

export type BaseError = {
  message: Scalars["String"];
};

export type BusinessRuleError = BaseError & {
  __typename?: "BusinessRuleError";
  message: Scalars["String"];
};

export type CreateTaskCategoryInput = {
  name: Scalars["String"];
};

export type CreateTaskCategoryOutput =
  | AuthenticationError
  | BusinessRuleError
  | CreateTaskCategorySuccessOutput
  | UnknownError
  | ValidationError;

export type CreateTaskCategorySuccessOutput = {
  __typename?: "CreateTaskCategorySuccessOutput";
  taskCategory: TaskCategory;
};

export type CreateTaskInput = {
  taskCategoryId: Scalars["ID"];
  taskDescription?: InputMaybe<Scalars["String"]>;
  taskTitle: Scalars["String"];
};

export type CreateTaskOutput =
  | AuthenticationError
  | BusinessRuleError
  | CreateTaskSuccessOutput
  | UnknownError
  | ValidationError;

export type CreateTaskSuccessOutput = {
  __typename?: "CreateTaskSuccessOutput";
  task: Task;
};

export type Mutation = {
  __typename?: "Mutation";
  archiveTask?: Maybe<ArchiveTaskOutput>;
  createTask: CreateTaskOutput;
  createTaskCategory?: Maybe<CreateTaskCategoryOutput>;
  signIn: SignInOutput;
  signUp?: Maybe<SignUpOutput>;
  updateTask?: Maybe<UpdateTaskOutput>;
};

export type MutationArchiveTaskArgs = {
  input: ArchiveTaskInput;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationCreateTaskCategoryArgs = {
  input: CreateTaskCategoryInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type Query = {
  __typename?: "Query";
  taskCategories: Array<Maybe<TaskCategory>>;
};

export type SignInInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignInOutput =
  | AuthenticationOutput
  | BusinessRuleError
  | UnknownError
  | ValidationError;

export type SignUpInput = {
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignUpOutput =
  | AuthenticationOutput
  | BusinessRuleError
  | UnknownError
  | ValidationError;

export type Task = {
  __typename?: "Task";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  status: TaskStatus;
  title: Scalars["String"];
};

export type TaskCategory = {
  __typename?: "TaskCategory";
  id: Scalars["ID"];
  name: Scalars["String"];
  tasks: Array<Maybe<Task>>;
};

export type TaskStatus = "Done" | "InProgress" | "ToDo";

export type UnknownError = BaseError & {
  __typename?: "UnknownError";
  message: Scalars["String"];
};

export type UpdateTaskInput = {
  newTaskColumnId?: InputMaybe<Scalars["ID"]>;
  newTaskDescription?: InputMaybe<Scalars["String"]>;
  newTaskTitle?: InputMaybe<Scalars["String"]>;
  taskId: Scalars["ID"];
};

export type UpdateTaskOutput =
  | AuthenticationError
  | BusinessRuleError
  | UnknownError
  | UpdateTaskSuccessOutput
  | ValidationError;

export type UpdateTaskSuccessOutput = {
  __typename?: "UpdateTaskSuccessOutput";
  task: Task;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
};

export type ValidationError = BaseError & {
  __typename?: "ValidationError";
  message: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArchiveTaskInput: ArchiveTaskInput;
  ArchiveTaskOutput:
    | ResolversTypes["ArchiveTaskSuccessOutput"]
    | ResolversTypes["AuthenticationError"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  ArchiveTaskSuccessOutput: ResolverTypeWrapper<ArchiveTaskSuccessOutput>;
  AuthenticationError: ResolverTypeWrapper<AuthenticationError>;
  AuthenticationOutput: ResolverTypeWrapper<AuthenticationOutput>;
  BaseError:
    | ResolversTypes["AuthenticationError"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  BusinessRuleError: ResolverTypeWrapper<BusinessRuleError>;
  CreateTaskCategoryInput: CreateTaskCategoryInput;
  CreateTaskCategoryOutput:
    | ResolversTypes["AuthenticationError"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["CreateTaskCategorySuccessOutput"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  CreateTaskCategorySuccessOutput: ResolverTypeWrapper<CreateTaskCategorySuccessOutput>;
  CreateTaskInput: CreateTaskInput;
  CreateTaskOutput:
    | ResolversTypes["AuthenticationError"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["CreateTaskSuccessOutput"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  CreateTaskSuccessOutput: ResolverTypeWrapper<CreateTaskSuccessOutput>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  SignInOutput:
    | ResolversTypes["AuthenticationOutput"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  SignUpInput: SignUpInput;
  SignUpOutput:
    | ResolversTypes["AuthenticationOutput"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["ValidationError"];
  String: ResolverTypeWrapper<Scalars["String"]>;
  Task: ResolverTypeWrapper<Task>;
  TaskCategory: ResolverTypeWrapper<TaskCategory>;
  TaskStatus: TaskStatus;
  UnknownError: ResolverTypeWrapper<UnknownError>;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskOutput:
    | ResolversTypes["AuthenticationError"]
    | ResolversTypes["BusinessRuleError"]
    | ResolversTypes["UnknownError"]
    | ResolversTypes["UpdateTaskSuccessOutput"]
    | ResolversTypes["ValidationError"];
  UpdateTaskSuccessOutput: ResolverTypeWrapper<UpdateTaskSuccessOutput>;
  User: ResolverTypeWrapper<User>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArchiveTaskInput: ArchiveTaskInput;
  ArchiveTaskOutput:
    | ResolversParentTypes["ArchiveTaskSuccessOutput"]
    | ResolversParentTypes["AuthenticationError"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  ArchiveTaskSuccessOutput: ArchiveTaskSuccessOutput;
  AuthenticationError: AuthenticationError;
  AuthenticationOutput: AuthenticationOutput;
  BaseError:
    | ResolversParentTypes["AuthenticationError"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  Boolean: Scalars["Boolean"];
  BusinessRuleError: BusinessRuleError;
  CreateTaskCategoryInput: CreateTaskCategoryInput;
  CreateTaskCategoryOutput:
    | ResolversParentTypes["AuthenticationError"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["CreateTaskCategorySuccessOutput"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  CreateTaskCategorySuccessOutput: CreateTaskCategorySuccessOutput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskOutput:
    | ResolversParentTypes["AuthenticationError"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["CreateTaskSuccessOutput"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  CreateTaskSuccessOutput: CreateTaskSuccessOutput;
  ID: Scalars["ID"];
  Mutation: {};
  Query: {};
  SignInInput: SignInInput;
  SignInOutput:
    | ResolversParentTypes["AuthenticationOutput"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  SignUpInput: SignUpInput;
  SignUpOutput:
    | ResolversParentTypes["AuthenticationOutput"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["ValidationError"];
  String: Scalars["String"];
  Task: Task;
  TaskCategory: TaskCategory;
  UnknownError: UnknownError;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskOutput:
    | ResolversParentTypes["AuthenticationError"]
    | ResolversParentTypes["BusinessRuleError"]
    | ResolversParentTypes["UnknownError"]
    | ResolversParentTypes["UpdateTaskSuccessOutput"]
    | ResolversParentTypes["ValidationError"];
  UpdateTaskSuccessOutput: UpdateTaskSuccessOutput;
  User: User;
  ValidationError: ValidationError;
};

export type ArchiveTaskOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["ArchiveTaskOutput"] = ResolversParentTypes["ArchiveTaskOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "ArchiveTaskSuccessOutput"
    | "AuthenticationError"
    | "BusinessRuleError"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type ArchiveTaskSuccessOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["ArchiveTaskSuccessOutput"] = ResolversParentTypes["ArchiveTaskSuccessOutput"]
> = {
  task?: Resolver<ResolversTypes["Task"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationErrorResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["AuthenticationError"] = ResolversParentTypes["AuthenticationError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["AuthenticationOutput"] = ResolversParentTypes["AuthenticationOutput"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseErrorResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["BaseError"] = ResolversParentTypes["BaseError"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationError"
    | "BusinessRuleError"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type BusinessRuleErrorResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["BusinessRuleError"] = ResolversParentTypes["BusinessRuleError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaskCategoryOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["CreateTaskCategoryOutput"] = ResolversParentTypes["CreateTaskCategoryOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationError"
    | "BusinessRuleError"
    | "CreateTaskCategorySuccessOutput"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type CreateTaskCategorySuccessOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["CreateTaskCategorySuccessOutput"] = ResolversParentTypes["CreateTaskCategorySuccessOutput"]
> = {
  taskCategory?: Resolver<
    ResolversTypes["TaskCategory"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaskOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["CreateTaskOutput"] = ResolversParentTypes["CreateTaskOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationError"
    | "BusinessRuleError"
    | "CreateTaskSuccessOutput"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type CreateTaskSuccessOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["CreateTaskSuccessOutput"] = ResolversParentTypes["CreateTaskSuccessOutput"]
> = {
  task?: Resolver<ResolversTypes["Task"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  archiveTask?: Resolver<
    Maybe<ResolversTypes["ArchiveTaskOutput"]>,
    ParentType,
    ContextType,
    RequireFields<MutationArchiveTaskArgs, "input">
  >;
  createTask?: Resolver<
    ResolversTypes["CreateTaskOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskArgs, "input">
  >;
  createTaskCategory?: Resolver<
    Maybe<ResolversTypes["CreateTaskCategoryOutput"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskCategoryArgs, "input">
  >;
  signIn?: Resolver<
    ResolversTypes["SignInOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "input">
  >;
  signUp?: Resolver<
    Maybe<ResolversTypes["SignUpOutput"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
  updateTask?: Resolver<
    Maybe<ResolversTypes["UpdateTaskOutput"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, "input">
  >;
};

export type QueryResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  taskCategories?: Resolver<
    Array<Maybe<ResolversTypes["TaskCategory"]>>,
    ParentType,
    ContextType
  >;
};

export type SignInOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["SignInOutput"] = ResolversParentTypes["SignInOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationOutput"
    | "BusinessRuleError"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type SignUpOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["SignUpOutput"] = ResolversParentTypes["SignUpOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationOutput"
    | "BusinessRuleError"
    | "UnknownError"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type TaskResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["Task"] = ResolversParentTypes["Task"]
> = {
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["TaskStatus"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskCategoryResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["TaskCategory"] = ResolversParentTypes["TaskCategory"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tasks?: Resolver<
    Array<Maybe<ResolversTypes["Task"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnknownErrorResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["UnknownError"] = ResolversParentTypes["UnknownError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTaskOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["UpdateTaskOutput"] = ResolversParentTypes["UpdateTaskOutput"]
> = {
  __resolveType: TypeResolveFn<
    | "AuthenticationError"
    | "BusinessRuleError"
    | "UnknownError"
    | "UpdateTaskSuccessOutput"
    | "ValidationError",
    ParentType,
    ContextType
  >;
};

export type UpdateTaskSuccessOutputResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["UpdateTaskSuccessOutput"] = ResolversParentTypes["UpdateTaskSuccessOutput"]
> = {
  task?: Resolver<ResolversTypes["Task"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<
  ContextType = GraphQlContext,
  ParentType extends ResolversParentTypes["ValidationError"] = ResolversParentTypes["ValidationError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQlContext> = {
  ArchiveTaskOutput?: ArchiveTaskOutputResolvers<ContextType>;
  ArchiveTaskSuccessOutput?: ArchiveTaskSuccessOutputResolvers<ContextType>;
  AuthenticationError?: AuthenticationErrorResolvers<ContextType>;
  AuthenticationOutput?: AuthenticationOutputResolvers<ContextType>;
  BaseError?: BaseErrorResolvers<ContextType>;
  BusinessRuleError?: BusinessRuleErrorResolvers<ContextType>;
  CreateTaskCategoryOutput?: CreateTaskCategoryOutputResolvers<ContextType>;
  CreateTaskCategorySuccessOutput?: CreateTaskCategorySuccessOutputResolvers<ContextType>;
  CreateTaskOutput?: CreateTaskOutputResolvers<ContextType>;
  CreateTaskSuccessOutput?: CreateTaskSuccessOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInOutput?: SignInOutputResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskCategory?: TaskCategoryResolvers<ContextType>;
  UnknownError?: UnknownErrorResolvers<ContextType>;
  UpdateTaskOutput?: UpdateTaskOutputResolvers<ContextType>;
  UpdateTaskSuccessOutput?: UpdateTaskSuccessOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
};
