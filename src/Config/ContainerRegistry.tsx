import { IContainerRegistry } from "../Core/Container/IContainerRegistry";
import { IProvider } from "../Core/Provider/IProvider";
import { INewable } from "../Core/Interface/INewable";
import { IContainerService } from "../Core/Container/IContainerService";
import { RestaurantRepositoryProvider } from "../Domain/Restaurant/Provider/RestaurantRepositoryProvider/RestaurantRepositoryProvider";

class ContainerRegistry implements IContainerRegistry {
  private static readonly REGISTERED_PROVIDERS: INewable<IProvider>[] = [
    RestaurantRepositoryProvider
  ];

  private readonly container: IContainerService;

  public constructor(container: IContainerService) {
    this.container = container;
  }

  public async registerAll(): Promise<void> {
    const providersLength = ContainerRegistry.REGISTERED_PROVIDERS.length;

    for (let i = 0; i < providersLength; i += 1) {
      const newableProvider = ContainerRegistry.REGISTERED_PROVIDERS[i];

      await this.registerProvider(newableProvider);
    }
  }

  public async registerProvider(
    newableProvider: INewable<IProvider>
  ): Promise<void> {
    const provider: IProvider = new newableProvider(this.container);

    await provider.register();
  }
}

export { ContainerRegistry };
