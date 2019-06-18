import { HttpError } from "./HttpError";

class ServerError extends HttpError {
  private static readonly CODE = 500;

  static get Code(): number {
    return ServerError.CODE;
  }
}

export { ServerError };
