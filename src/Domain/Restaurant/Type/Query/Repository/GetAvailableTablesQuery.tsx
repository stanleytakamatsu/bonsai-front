import IGetAvailableTablesQuery from "./IGetAvailableTablesQuery";

class GetAvailableTablesQuery implements IGetAvailableTablesQuery {
  private restaurantGuid: string;

  private bookingDateTime: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get BookingDateTime(): string {
    return this.bookingDateTime;
  }

  public static create(
    restaurantGuid: string,
    bookingDateTime: string
  ): GetAvailableTablesQuery {
    const command = new GetAvailableTablesQuery();

    command.restaurantGuid = restaurantGuid;
    command.bookingDateTime = bookingDateTime;

    return command;
  }
}

export { GetAvailableTablesQuery };
