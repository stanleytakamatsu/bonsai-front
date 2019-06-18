import IGetTablesQuery from "./IGetTablesQuery";

class GetBookingsQuery implements IGetTablesQuery {
  private restaurantGuid: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public static create(restaurantGuid: string): GetBookingsQuery {
    const command = new GetBookingsQuery();

    command.restaurantGuid = restaurantGuid;

    return command;
  }
}

export { GetBookingsQuery };
