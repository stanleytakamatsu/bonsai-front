interface IEditBookingCommand {
  RestaurantGuid: string;
  BookingGuid: string;
  TableGuid: string;
  BookingDateTime: string;
}

export default IEditBookingCommand;
