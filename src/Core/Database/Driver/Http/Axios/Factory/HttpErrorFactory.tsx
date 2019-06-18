import { AxiosError } from "axios";

import { BadRequestError } from "../../../../../Error/Http/BadRequestError";
import { ConflictError } from "../../../../../Error/Http/ConflictError";
import { ForbiddenError } from "../../../../../Error/Http/ForbiddenError";
import { HttpError } from "../../../../../Error/Http/HttpError";
import { NotFoundError } from "../../../../../Error/Http/NotFoundError";
import { ServerError } from "../../../../../Error/Http/ServerError";
import { UnauthorizedError } from "../../../../../Error/Http/UnauthorizedError";

class HttpErrorFactory {
  public static createHttpError(error: AxiosError): HttpError {
    const message = this.getMessage(error);
    const details = this.getDetails(error);
    const code = this.getStatus(error);

    switch (code) {
      case BadRequestError.Code:
        return new BadRequestError(message, details);
      case ConflictError.Code:
        return new ConflictError(message, details);
      case ForbiddenError.Code:
        return new ForbiddenError(message, details);
      case NotFoundError.Code:
        return new NotFoundError(message, details);
      case UnauthorizedError.Code:
        return new UnauthorizedError(message, details);
      default:
        return new ServerError(message, details);
    }
  }

  public static getMessage(error: AxiosError): string {
    if (error.response) {
      return error.response.data["message"];
    }

    return error.message;
  }

  public static getDetails(error: AxiosError): any {
    if (error.response) {
      return error.response.data["details"];
    }

    return;
  }

  public static getStatus(error: AxiosError): any {
    if (error.response) {
      return error.response.status;
    }

    return 500;
  }
}

export { HttpErrorFactory };
