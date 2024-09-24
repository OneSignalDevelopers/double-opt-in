export const safeTry = async <T>(
  fn: () => Promise<T>
): Promise<[Error | null, T | null]> => {
  try {
    const result = await fn()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).ok) {
      return [null, result]
    } else {
      return [new Error("Did not get back a successful response from OneSignal API"), null]
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else if (typeof e === 'string') {
      console.error(e)
    } else {
      console.error('An error occurred')
    }

    return [e instanceof Error ? e : new Error(String(e)), null]
  }
}
