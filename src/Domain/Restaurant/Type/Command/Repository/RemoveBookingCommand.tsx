import IRemoveBookingCommand from "./IRemoveBookingCommand";

class RemoveBookingCommand implements IRemoveBookingCommand {
  private bookingGuid: string;

  public get BookingGuid(): string {
    return this.bookingGuid;
  }

  public static create(bookingGuid: string): RemoveBookingCommand {
    const command = new RemoveBookingCommand();

    command.bookingGuid = bookingGuid;

    return command;
  }
}

export { RemoveBookingCommand };
