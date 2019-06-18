import IGetAvailableHoursQuery from "./IGetAvailableHoursQuery";

class GetAvailableHoursQuery implements IGetAvailableHoursQuery {
  private restaurantGuid: string;

  private bookingDate: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get BookingDate(): string {
    return this.bookingDate;
  }

  public static create(
    restaurantGuid: string,
    bookingDate: string
  ): GetAvailableHoursQuery {
    const command = new GetAvailableHoursQuery();

    command.restaurantGuid = restaurantGuid;
    command.bookingDate = bookingDate;

    return command;
  }
}

export { GetAvailableHoursQuery };
