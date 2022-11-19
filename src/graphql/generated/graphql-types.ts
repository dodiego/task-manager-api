import { GraphQLResolveInfo } from 'graphql';
import { GraphQlContext } from 'graphql/context';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArchiveTaskInput = {
  taskId: Scalars['ID'];
};

export type ArchiveTaskOutput = {
  __typename?: 'ArchiveTaskOutput';
  success: Scalars['Boolean'];
};

export type CreateTaskCategoryInput = {
  name: Scalars['String'];
};

export type CreateTaskCategoryOutput = {
  __typename?: 'CreateTaskCategoryOutput';
  TaskCategory?: Maybe<TaskCategory>;
};

export type CreateTaskInput = {
  taskCategoryId: Scalars['ID'];
  taskDescription?: InputMaybe<Scalars['String']>;
  taskTitle: Scalars['String'];
};

export type CreateTaskOutput = {
  __typename?: 'CreateTaskOutput';
  task?: Maybe<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveTask?: Maybe<ArchiveTaskOutput>;
  createTask?: Maybe<CreateTaskOutput>;
  createTaskCategory?: Maybe<CreateTaskCategoryOutput>;
  signIn?: Maybe<SignInOutput>;
  signUp?: Maybe<SignUpOutput>;
  updateTask?: Maybe<UpdateTaskOutput>;
};


export type MutationArchiveTaskArgs = {
  input?: InputMaybe<ArchiveTaskInput>;
};


export type MutationCreateTaskArgs = {
  input?: InputMaybe<CreateTaskInput>;
};


export type MutationCreateTaskCategoryArgs = {
  input?: InputMaybe<CreateTaskCategoryInput>;
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<SignUpInput>;
};


export type MutationUpdateTaskArgs = {
  input?: InputMaybe<UpdateTaskInput>;
};

export type Query = {
  __typename?: 'Query';
  taskCategories: Array<Maybe<Task>>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  accessToken: Scalars['String'];
};

export type SignUpInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  user?: Maybe<User>;
};

export type Task = {
  __typename?: 'Task';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: Maybe<TaskStatus>;
  title: Scalars['String'];
};

export type TaskCategory = {
  __typename?: 'TaskCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  tasks: Array<Maybe<Task>>;
};

export enum TaskStatus {
  Done = 'Done',
  InProgress = 'InProgress',
  ToDo = 'ToDo'
}

export type UpdateTaskInput = {
  newTaskColumnId?: InputMaybe<Scalars['ID']>;
  newTaskDescription?: InputMaybe<Scalars['String']>;
  newTaskTitle?: InputMaybe<Scalars['String']>;
  taskId: Scalars['ID'];
};

export type UpdateTaskOutput = {
  __typename?: 'UpdateTaskOutput';
  task?: Maybe<Task>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArchiveTaskInput: ArchiveTaskInput;
  ArchiveTaskOutput: ResolverTypeWrapper<ArchiveTaskOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateTaskCategoryInput: CreateTaskCategoryInput;
  CreateTaskCategoryOutput: ResolverTypeWrapper<CreateTaskCategoryOutput>;
  CreateTaskInput: CreateTaskInput;
  CreateTaskOutput: ResolverTypeWrapper<CreateTaskOutput>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  SignInOutput: ResolverTypeWrapper<SignInOutput>;
  SignUpInput: SignUpInput;
  SignUpOutput: ResolverTypeWrapper<SignUpOutput>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskCategory: ResolverTypeWrapper<TaskCategory>;
  TaskStatus: TaskStatus;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskOutput: ResolverTypeWrapper<UpdateTaskOutput>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArchiveTaskInput: ArchiveTaskInput;
  ArchiveTaskOutput: ArchiveTaskOutput;
  Boolean: Scalars['Boolean'];
  CreateTaskCategoryInput: CreateTaskCategoryInput;
  CreateTaskCategoryOutput: CreateTaskCategoryOutput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskOutput: CreateTaskOutput;
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  SignInInput: SignInInput;
  SignInOutput: SignInOutput;
  SignUpInput: SignUpInput;
  SignUpOutput: SignUpOutput;
  String: Scalars['String'];
  Task: Task;
  TaskCategory: TaskCategory;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskOutput: UpdateTaskOutput;
  User: User;
};

export type ArchiveTaskOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['ArchiveTaskOutput'] = ResolversParentTypes['ArchiveTaskOutput']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaskCategoryOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['CreateTaskCategoryOutput'] = ResolversParentTypes['CreateTaskCategoryOutput']> = {
  TaskCategory?: Resolver<Maybe<ResolversTypes['TaskCategory']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateTaskOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['CreateTaskOutput'] = ResolversParentTypes['CreateTaskOutput']> = {
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  archiveTask?: Resolver<Maybe<ResolversTypes['ArchiveTaskOutput']>, ParentType, ContextType, Partial<MutationArchiveTaskArgs>>;
  createTask?: Resolver<Maybe<ResolversTypes['CreateTaskOutput']>, ParentType, ContextType, Partial<MutationCreateTaskArgs>>;
  createTaskCategory?: Resolver<Maybe<ResolversTypes['CreateTaskCategoryOutput']>, ParentType, ContextType, Partial<MutationCreateTaskCategoryArgs>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInOutput']>, ParentType, ContextType, Partial<MutationSignInArgs>>;
  signUp?: Resolver<Maybe<ResolversTypes['SignUpOutput']>, ParentType, ContextType, Partial<MutationSignUpArgs>>;
  updateTask?: Resolver<Maybe<ResolversTypes['UpdateTaskOutput']>, ParentType, ContextType, Partial<MutationUpdateTaskArgs>>;
};

export type QueryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  taskCategories?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType>;
};

export type SignInOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['SignInOutput'] = ResolversParentTypes['SignInOutput']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['SignUpOutput'] = ResolversParentTypes['SignUpOutput']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskCategoryResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['TaskCategory'] = ResolversParentTypes['TaskCategory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Array<Maybe<ResolversTypes['Task']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTaskOutputResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['UpdateTaskOutput'] = ResolversParentTypes['UpdateTaskOutput']> = {
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQlContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQlContext> = {
  ArchiveTaskOutput?: ArchiveTaskOutputResolvers<ContextType>;
  CreateTaskCategoryOutput?: CreateTaskCategoryOutputResolvers<ContextType>;
  CreateTaskOutput?: CreateTaskOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInOutput?: SignInOutputResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskCategory?: TaskCategoryResolvers<ContextType>;
  UpdateTaskOutput?: UpdateTaskOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

