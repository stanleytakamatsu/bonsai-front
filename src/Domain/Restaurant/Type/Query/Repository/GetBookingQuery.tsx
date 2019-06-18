import IGetBookingQuery from "./IGetBookingQuery";

class GetBookingQuery implements IGetBookingQuery {
  private restaurantGuid: string;

  private bookingGuid: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get BookingGuid(): string {
    return this.bookingGuid;
  }

  public static create(
    restaurantGuid: string,
    bookingGuid: string
  ): GetBookingQuery {
    const command = new GetBookingQuery();

    command.restaurantGuid = restaurantGuid;
    command.bookingGuid = bookingGuid;

    return command;
  }
}

export { GetBookingQuery };
