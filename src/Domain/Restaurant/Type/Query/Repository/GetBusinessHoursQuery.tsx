import IGetBusinessHours from "./IGetRestaurantByGuidQuery";

class GetBusinessHoursQuery implements IGetBusinessHours {
  private restaurantGuid: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public static create(restaurantGuid: string): GetBusinessHoursQuery {
    const command = new GetBusinessHoursQuery();

    command.restaurantGuid = restaurantGuid;

    return command;
  }
}

export { GetBusinessHoursQuery };
