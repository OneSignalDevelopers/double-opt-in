export const safeTry = async fn => {
  try {
    const result = await fn()
    return [null, result]
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    } else if (typeof e === 'string') {
      console.error(e)
    } else {
      console.error('An error occurred')
    }

    return [e, null]
  }
}
