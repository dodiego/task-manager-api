export type PrivateHandler<TInput, TOutput> = (
  userToken: string,
  input: TInput
) => Promise<TOutput>;

export type PrivateHandlerFactory<TDependencies, TInput, TOutput> = (
  dependencies: TDependencies
) => PrivateHandler<TInput, TOutput>;

export type PublicHandler<TInput, TOutput> = (
  input: TInput
) => Promise<TOutput>;

export type PublicHandlerFactory<TDependencies, TInput, TOutput> = (
  dependencies: TDependencies
) => PublicHandler<TInput, TOutput>;

export class BusinessRuleError extends Error {}
