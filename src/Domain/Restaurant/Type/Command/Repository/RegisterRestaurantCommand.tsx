import IRegisterRestaurantCommand from "./IRegisterRestaurantCommand";

class RegisterRestaurantCommand implements IRegisterRestaurantCommand {
  private name: string;

  public get Name(): string {
    return this.name;
  }

  public static create(name: string): RegisterRestaurantCommand {
    const command = new RegisterRestaurantCommand();

    command.name = name;

    return command;
  }
}

export { RegisterRestaurantCommand };
