import IAddBusinessHourCommand from "./IAddBusinessHourCommand";

class AddBusinessHourCommand implements IAddBusinessHourCommand {
  private restaurantGuid: string;

  private weekday: string;

  private startHour: string;

  private endHour: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get Weekday(): string {
    return this.weekday;
  }

  public get EndHour(): string {
    return this.endHour;
  }

  public get StartHour(): string {
    return this.startHour;
  }

  public static create(
    weekday: string,
    startHour: string,
    endHour: string,
    restaurantGuid: string
  ): AddBusinessHourCommand {
    const command = new AddBusinessHourCommand();

    command.restaurantGuid = restaurantGuid;
    command.weekday = weekday;
    command.endHour = endHour;
    command.startHour = startHour;

    return command;
  }
}

export { AddBusinessHourCommand };
