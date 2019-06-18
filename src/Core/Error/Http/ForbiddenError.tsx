import { HttpError } from "./HttpError";

class ForbiddenError extends HttpError {
  private static readonly CODE = 403;

  static get Code(): number {
    return ForbiddenError.CODE;
  }
}

export { ForbiddenError };
