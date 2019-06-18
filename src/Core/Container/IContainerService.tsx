interface IContainerService {
  register<T>(serviceIdentifier: symbol, service: () => Promise<T>): void;

  get<T>(serviceIdentifier: symbol): Promise<T>;
}

const IContainerService = Symbol.for('IContainerService');

export { IContainerService };
