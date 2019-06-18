import { Serializer } from "../../../../Core/Serialize/Serializer";
import { deserialize } from "cerialize";

class TableMapper extends Serializer {
  @deserialize
  private guid: string;

  @deserialize
  private code: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Code(): string {
    return this.code;
  }
}

export { TableMapper };
