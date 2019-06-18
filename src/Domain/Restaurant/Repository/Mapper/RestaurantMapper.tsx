import { Serializer } from "../../../../Core/Serialize/Serializer";
import { deserialize } from "cerialize";

class RestaurantMapper extends Serializer {
  @deserialize
  private guid: string;

  @deserialize
  private name: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Name(): string {
    return this.name;
  }
}

export { RestaurantMapper };
