export type PrivateHandler<TInput, TOutput> = (
  userToken: string,
  input: TInput
) => Promise<TOutput>;

export type PrivateHandlerFactory<TDependencies, TInput, TOutput> = (
  dependencies: TDependencies
) => PrivateHandler<TInput, TOutput>;
