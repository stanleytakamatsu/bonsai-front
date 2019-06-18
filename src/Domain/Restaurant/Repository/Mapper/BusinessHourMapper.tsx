import { Serializer } from "../../../../Core/Serialize/Serializer";
import { deserialize } from "cerialize";

class BusinessHourMapper extends Serializer {
  @deserialize
  private guid: string;

  @deserialize
  private weekday: string;

  @deserialize
  private startHour: string;

  @deserialize
  private endHour: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Weekday(): string {
    return this.weekday;
  }

  public get StartHour(): string {
    return this.startHour;
  }

  public get EndHour(): string {
    return this.endHour;
  }
}

export { BusinessHourMapper };
