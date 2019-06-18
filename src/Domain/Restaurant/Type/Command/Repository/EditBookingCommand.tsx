import IEditBookingCommand from "./IEditBookingCommand";

class EditBookingCommand implements IEditBookingCommand {
  private restaurantGuid: string;

  private bookingGuid: string;

  private tableGuid: string;

  private bookingDateTime: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get BookingGuid(): string {
    return this.bookingGuid;
  }

  public get TableGuid(): string {
    return this.tableGuid;
  }

  public get BookingDateTime(): string {
    return this.bookingDateTime;
  }

  public static create(
    restaurantGuid: string,
    bookingGuid: string,
    tableGuid: string,
    bookingDateTime: string
  ): EditBookingCommand {
    const command = new EditBookingCommand();

    command.restaurantGuid = restaurantGuid;
    command.bookingGuid = bookingGuid;
    command.tableGuid = tableGuid;
    command.bookingDateTime = bookingDateTime;

    return command;
  }
}

export { EditBookingCommand };
