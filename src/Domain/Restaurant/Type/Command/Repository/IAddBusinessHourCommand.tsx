interface IAddBusinessHourCommand {
  RestaurantGuid: string;
  Weekday: string;
  StartHour: string;
  EndHour: string;
}

export default IAddBusinessHourCommand;
