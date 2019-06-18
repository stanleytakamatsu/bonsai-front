import { IContainerService } from "../Container/IContainerService";
import { IContainerStrategy } from "./Strategy/IContainerStrategy";

class ContainerService implements IContainerService {
  private readonly container: IContainerStrategy;

  public constructor(container: IContainerStrategy) {
    this.container = container;
  }

  public register<T>(
    serviceIdentifier: symbol,
    service: () => Promise<T>
  ): void {
    this.container.register<T>(serviceIdentifier, service);
  }

  public async get<T>(serviceIdentifier: symbol): Promise<T> {
    try {
      let factory = await this.container.get<() => T>(serviceIdentifier);

      return factory();
    } catch (e) {
      return this.get<T>(serviceIdentifier);
    }
  }
}

export { ContainerService };
