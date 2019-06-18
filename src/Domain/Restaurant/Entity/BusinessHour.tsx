import { BusinessHourMapper } from "../Repository/Mapper/BusinessHourMapper";

class BusinessHour {
  private guid: string;

  private weekday: string;

  private startHour: string;

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

  public static createFromMapper(mapper: BusinessHourMapper): BusinessHour {
    const businessHour = new BusinessHour();

    businessHour.guid = mapper.Guid;
    businessHour.weekday = mapper.Weekday;
    businessHour.startHour = mapper.StartHour;
    businessHour.endHour = mapper.EndHour;

    return businessHour;
  }
}

export { BusinessHour };
