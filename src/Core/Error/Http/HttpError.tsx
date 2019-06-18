abstract class HttpError implements Error {
  public readonly name: string;

  public readonly message: string;

  public readonly details: any;

  public readonly stack: string = new Error().stack;

  public constructor(message: string, details: any) {
    this.message = message;

    this.details = details;

    this.name = this.constructor.name;
  }

  public get Message(): string {
    return this.message;
  }

  public get Stack(): string {
    return this.stack;
  }
}

export { HttpError };
