import IRestaurantRepository from "../../Repository/IRestaurantRepository";
import { RestaurantRepository } from "../../Repository/RestaurantRepository";
import { IApplicationConfiguration } from "../../../../Config/IApplicationConfiguration";
import { AxiosHttp } from "../../../../Core/Database/Driver/Http/Axios/AxiosHttpDriver";
import { IContainerService } from "../../../../Core/Container/IContainerService";
import { IProvider } from "../../../../Core/Provider/IProvider";

class RestaurantRepositoryProvider implements IProvider {
  private readonly container: IContainerService;

  public constructor(container: IContainerService) {
    this.container = container;
  }

  public async register(): Promise<void> {
    await this.registerSignInRepository();
  }

  private async registerSignInRepository(): Promise<void> {
    this.container.register<IRestaurantRepository>(
      IRestaurantRepository,
      () => {
        return new Promise<IRestaurantRepository>(async resolve => {
          const config = await this.container.get<IApplicationConfiguration>(
            IApplicationConfiguration
          );
          const timeout = 3600;
          const httpClient = new AxiosHttp({
            baseUrl: config.apiBaseUrl(),
            connectionTimeout: timeout
          });
          const repository = new RestaurantRepository(httpClient);

          resolve(repository);
        });
      }
    );
  }
}

export { RestaurantRepositoryProvider };
