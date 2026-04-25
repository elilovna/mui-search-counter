export const assertNever = (action: never): never => {
  throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
};
