import { HttpError } from "./HttpError";

class BadRequestError extends HttpError {
  private static readonly CODE = 400;

  static get Code(): number {
    return BadRequestError.CODE;
  }
}

export { BadRequestError };
