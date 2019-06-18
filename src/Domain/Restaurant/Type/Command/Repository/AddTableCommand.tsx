import IAddTableCommand from "./IAddTableCommand";

class AddTableCommand implements IAddTableCommand {
  private restaurantGuid: string;

  private code: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get Code(): string {
    return this.code;
  }

  public static create(code: string, restaurantGuid: string): AddTableCommand {
    const command = new AddTableCommand();

    command.restaurantGuid = restaurantGuid;
    command.code = code;

    return command;
  }
}

export { AddTableCommand };
