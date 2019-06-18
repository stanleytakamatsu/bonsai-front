import IGetTablesQuery from "./IGetTablesQuery";

class GetTablesQuery implements IGetTablesQuery {
  private restaurantGuid: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public static create(restaurantGuid: string): GetTablesQuery {
    const command = new GetTablesQuery();

    command.restaurantGuid = restaurantGuid;

    return command;
  }
}

export { GetTablesQuery };
