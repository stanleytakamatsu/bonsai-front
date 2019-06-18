import { HttpError } from "./HttpError";

class ConflictError extends HttpError {
  private static readonly CODE = 409;

  static get Code(): number {
    return ConflictError.CODE;
  }
}

export { ConflictError };
