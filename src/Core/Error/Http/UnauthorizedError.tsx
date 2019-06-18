import { HttpError } from "./HttpError";

class UnauthorizedError extends HttpError {
  private static readonly CODE = 401;

  static get Code(): number {
    return UnauthorizedError.CODE;
  }
}

export { UnauthorizedError };
