import * as moment from "moment";

interface IMakeBookingCommand {
  RestaurantGuid: string;
  TableGuid: string;
  BookingDatetime: moment.Moment;
  Name: string;
  Email: string;
}

export default IMakeBookingCommand;
