import moment from "moment";

import IMakeBookingCommand from "./IMakeBookingCommand";

class MakeBookingCommand implements IMakeBookingCommand {
  private restaurantGuid: string;

  private tableGuid: string;

  private bookingDatetime: moment.Moment;

  private name: string;

  private email: string;

  public get RestaurantGuid(): string {
    return this.restaurantGuid;
  }

  public get TableGuid(): string {
    return this.tableGuid;
  }

  public get BookingDatetime(): moment.Moment {
    return this.bookingDatetime;
  }

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public static create(
    restaurantGuid: string,
    tableGuid: string,
    bookingDatetime: string,
    name: string,
    email: string
  ): MakeBookingCommand {
    const command = new MakeBookingCommand();

    command.restaurantGuid = restaurantGuid;
    command.tableGuid = tableGuid;
    command.bookingDatetime = moment(bookingDatetime);
    command.name = name;
    command.email = email;

    return command;
  }
}

export { MakeBookingCommand };
