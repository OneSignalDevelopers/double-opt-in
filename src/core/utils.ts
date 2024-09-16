type AsyncFunction<T> = () => Promise<T>;

export const safeTry = async <T>(fn: AsyncFunction<T>): Promise<[Error | null, T | null]> => {
  try {
    const result = await fn();
    return [null, result];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else if (typeof e === 'string') {
      console.error(e);
    } else {
      console.error('An error occurred');
    }

    return [e as Error, null];
  }
};
