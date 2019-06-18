import { Environments } from "./Environments";
import IConfig from "./IConfig";

class ConfigStrategy {
  public static async get(env: Environments): Promise<IConfig> {
    switch (env) {
      case Environments.PRODUCTION:
        return require("./Config.Development")["Config"];
      default:
        return require("./Config.Development")["Config"];
    }
  }
}

export { ConfigStrategy };
