import { ConfigStrategy } from "./Environment/ConfigStrategy";
import { Environments } from "./Environment/Environments";
import IConfig from "./Environment/IConfig";
import { IApplicationConfiguration } from "./IApplicationConfiguration";

class ApplicationConfiguration implements IApplicationConfiguration {
  private config: IConfig;

  public async loadConfig(): Promise<void> {
    this.config = await ConfigStrategy.get(process.env
      .NODE_ENV as Environments);
  }

  public apiBaseUrl(): string {
    return this.config.API_BASE_URL;
  }
}

export { ApplicationConfiguration };
