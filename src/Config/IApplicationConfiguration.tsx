interface IApplicationConfiguration {
  apiBaseUrl(): string;
}

const IApplicationConfiguration = Symbol.for('IApplicationConfiguration');

export { IApplicationConfiguration };
