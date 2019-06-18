import IRegisterRestaurantCommand from "../Type/Command/Repository/IRegisterRestaurantCommand";
import { Restaurant } from "../Entity/Restaurant";
import IGetRestaurantByGuidQuery from "../Type/Query/Repository/IGetRestaurantByGuidQuery";
import IGetBusinessHoursQuery from "../Type/Query/Repository/IGetBusinessHoursQuery";
import { BusinessHour } from "../Entity/BusinessHour";
import IGetTablesQuery from "../Type/Query/Repository/IGetTablesQuery";
import { Table } from "../Entity/Table";
import IAddTableCommand from "../Type/Command/Repository/IAddTableCommand";
import IAddBusinessHourCommand from "../Type/Command/Repository/IAddBusinessHourCommand";
import IGetAvailableHoursQuery from "../Type/Query/Repository/IGetAvailableHoursQuery";
import IMakeBookingCommand from "../Type/Command/Repository/IMakeBookingCommand";
import IGetBookingsQuery from "../Type/Query/Repository/IGetBookingsQuery";
import { Booking } from "../Entity/Booking";
import IRemoveBookingCommand from "../Type/Command/Repository/IRemoveBookingCommand";
import IGetAvailableTablesQuery from "../Type/Query/Repository/IGetAvailableTablesQuery";
import IGetBookingQuery from "../Type/Query/Repository/IGetBookingQuery";
import IEditBookingCommand from "../Type/Command/Repository/IEditBookingCommand";

interface IRestaurantRepository {
  registerRestaurant(command: IRegisterRestaurantCommand): Promise<void>;
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(query: IGetRestaurantByGuidQuery): Promise<Restaurant>;
  getBusinessHours(query: IGetBusinessHoursQuery): Promise<BusinessHour[]>;
  getAvailableHours(query: IGetAvailableHoursQuery): Promise<[string]>;
  getAvailableTables(query: IGetAvailableTablesQuery): Promise<Table[]>;
  getTables(query: IGetTablesQuery): Promise<Table[]>;
  getBookings(query: IGetBookingsQuery): Promise<Booking[]>;
  getBooking(query: IGetBookingQuery): Promise<Booking>;
  editBooking(command: IEditBookingCommand): Promise<void>;
  addTable(command: IAddTableCommand): Promise<void>;
  addBusinessHour(command: IAddBusinessHourCommand): Promise<void>;
  makeBooking(command: IMakeBookingCommand): Promise<void>;
  removeBooking(command: IRemoveBookingCommand): Promise<void>;
}

const IRestaurantRepository = Symbol.for("IRestaurantRepository");

export default IRestaurantRepository;
