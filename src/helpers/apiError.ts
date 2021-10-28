export default class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly source?: Error
  ) {
    super(message)
  }
}
