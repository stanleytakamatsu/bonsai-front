import { HttpError } from "./HttpError";

class NotFoundError extends HttpError {
  private static readonly CODE = 404;

  static get Code(): number {
    return NotFoundError.CODE;
  }
}

export { NotFoundError };
