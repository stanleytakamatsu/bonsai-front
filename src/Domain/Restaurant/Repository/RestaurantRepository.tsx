import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import IRegisterRestaurantCommand from "../Type/Command/Repository/IRegisterRestaurantCommand";
import IHttpDriver from "../../../Core/Database/Driver/Http/IHttpDriver";
import IRestaurantRepository from "./IRestaurantRepository";
import { Restaurant } from "../Entity/Restaurant";
import IGetRestaurantByGuidQuery from "../Type/Query/Repository/IGetRestaurantByGuidQuery";
import IGetBusinessHours from "../Type/Query/Repository/IGetBusinessHoursQuery";
import { FindRecordError } from "../../../Core/Error/Repository/FindRecordError";
import { RestaurantMapper } from "./Mapper/RestaurantMapper";
import { BusinessHour } from "../Entity/BusinessHour";
import { BusinessHourMapper } from "./Mapper/BusinessHourMapper";
import { Table } from "../Entity/Table";
import { TableMapper } from "./Mapper/TableMapper";
import IAddTableCommand from "../Type/Command/Repository/IAddTableCommand";
import IAddBusinessHourCommand from "../Type/Command/Repository/IAddBusinessHourCommand";
import IGetAvailableHoursQuery from "../Type/Query/Repository/IGetAvailableHoursQuery";
import IMakeBookingCommand from "../Type/Command/Repository/IMakeBookingCommand";
import IGetBookingsQuery from "../Type/Query/Repository/IGetBookingsQuery";
import { Booking } from "../Entity/Booking";
import { BookingMapper } from "./Mapper/BookingMapper";
import IRemoveBookingCommand from "../Type/Command/Repository/IRemoveBookingCommand";
import IGetAvailableTablesQuery from "../Type/Query/Repository/IGetAvailableTablesQuery";
import IGetBookingQuery from "../Type/Query/Repository/IGetBookingQuery";
import IEditBookingCommand from "../Type/Command/Repository/IEditBookingCommand";

class RestaurantRepository implements IRestaurantRepository {
  private httpClient: IHttpDriver;

  private restaurantUrl = "v1/restaurants";

  private bookingUrl = "v1/bookings";

  public constructor(httpClient: IHttpDriver) {
    this.httpClient = httpClient;
  }

  public async registerRestaurant(
    command: IRegisterRestaurantCommand
  ): Promise<void> {
    try {
      const params = {
        name: command.Name
      };

      await this.httpClient.post(this.restaurantUrl, params);
    } catch (error) {
      throw new SaveRecordError(
        "Error while trying to save the restaurant.",
        error
      );
    }
  }

  public async getRestaurants(): Promise<Restaurant[]> {
    try {
      const response: any = await this.httpClient.get(this.restaurantUrl);

      return Array.from(response["data"] || []).map((restaurant: any) => {
        const mapper = RestaurantMapper.deserialize<RestaurantMapper>(
          restaurant
        );

        return Restaurant.createFromMapper(mapper);
      });
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to retrieve the restaurants.",
        error
      );
    }
  }

  public async getRestaurant(
    query: IGetRestaurantByGuidQuery
  ): Promise<Restaurant> {
    try {
      const response: { data: any } = await this.httpClient.get(
        this.restaurantUrl + "/" + query.RestaurantGuid
      );

      const mapper = RestaurantMapper.deserialize<RestaurantMapper>(
        response["data"]
      );

      return Restaurant.createFromMapper(mapper);
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to get the restaurant.",
        error
      );
    }
  }

  public async getBusinessHours(
    query: IGetBusinessHours
  ): Promise<BusinessHour[]> {
    try {
      const response: { data: any } = await this.httpClient.get(
        this.restaurantUrl + "/" + query.RestaurantGuid + "/business/hours"
      );

      return Array.from(response["data"] || []).map((businessHour: any) => {
        const mapper = BusinessHourMapper.deserialize<BusinessHourMapper>(
          businessHour
        );

        return BusinessHour.createFromMapper(mapper);
      });
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to get the business hours.",
        error
      );
    }
  }

  public async getTables(query: IGetBusinessHours): Promise<Table[]> {
    try {
      const response: { data: any } = await this.httpClient.get(
        this.restaurantUrl + "/" + query.RestaurantGuid + "/tables"
      );

      return Array.from(response["data"] || []).map((tables: any) => {
        const mapper = TableMapper.deserialize<TableMapper>(tables);

        return Table.createFromMapper(mapper);
      });
    } catch (error) {
      throw new FindRecordError("Error while trying to get the tables.", error);
    }
  }

  public async addTable(command: IAddTableCommand): Promise<void> {
    try {
      const params = {
        code: command.Code
      };

      await this.httpClient.post(
        this.restaurantUrl + "/" + command.RestaurantGuid + "/tables",
        params
      );
    } catch (error) {
      throw new SaveRecordError("Error while trying to add the table.", error);
    }
  }

  public async addBusinessHour(
    command: IAddBusinessHourCommand
  ): Promise<void> {
    try {
      const params = {
        weekday: command.Weekday,
        startHour: command.StartHour,
        endHour: command.EndHour
      };

      console.log(params);

      await this.httpClient.post(
        this.restaurantUrl + "/" + command.RestaurantGuid + "/business/hours",
        params
      );
    } catch (error) {
      throw new SaveRecordError(
        "Error while trying to add business hour.",
        error
      );
    }
  }

  public async getAvailableHours(
    query: IGetAvailableHoursQuery
  ): Promise<[string]> {
    try {
      const response: { data: [string] } = await this.httpClient.get(
        `${this.restaurantUrl}/${
          query.RestaurantGuid
        }/available/hours?bookingDate=${query.BookingDate}`
      );

      return response.data;
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to get available hours.",
        error
      );
    }
  }

  public async getAvailableTables(
    query: IGetAvailableTablesQuery
  ): Promise<Table[]> {
    try {
      console.log(query);

      const response: { data: any } = await this.httpClient.get(
        `${this.restaurantUrl}/${
          query.RestaurantGuid
        }/available/tables?bookingDateTime=${query.BookingDateTime}`
      );

      return Array.from(response["data"] || []).map((tables: any) => {
        const mapper = TableMapper.deserialize<TableMapper>(tables);

        return Table.createFromMapper(mapper);
      });
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to get available hours.",
        error
      );
    }
  }

  public async makeBooking(command: IMakeBookingCommand): Promise<void> {
    try {
      const params = {
        restaurantGuid: command.RestaurantGuid,
        bookingDateTime: command.BookingDatetime.format("YYYY-MM-DD HH:mm"),
        tableGuid: command.TableGuid,
        name: command.Name,
        email: command.Email
      };

      await this.httpClient.post(`${this.bookingUrl}`, params);
    } catch (error) {
      throw new SaveRecordError("Error while trying to make booking.", error);
    }
  }

  public async editBooking(command: IEditBookingCommand): Promise<void> {
    try {
      const params = {
        restaurantGuid: command.RestaurantGuid,
        bookingDateTime: command.BookingDateTime,
        tableGuid: command.TableGuid
      };

      await this.httpClient.put(
        `${this.bookingUrl}/${command.BookingGuid}`,
        params
      );
    } catch (error) {
      throw new SaveRecordError("Error while trying to edit booking.", error);
    }
  }

  public async getBookings(query: IGetBookingsQuery): Promise<Booking[]> {
    try {
      const response: { data: any } = await this.httpClient.get(
        `${this.bookingUrl}?restaurantGuid=${query.RestaurantGuid}`
      );
      const bookingsMapper = Array.from(response["data"] || []).map<
        BookingMapper
      >(booking => BookingMapper.deserialize(booking));

      return bookingsMapper.map(bookingMapper =>
        Booking.createFromMapper(bookingMapper)
      );
    } catch (error) {
      throw new FindRecordError(
        "Error while trying to get list of booking.",
        error
      );
    }
  }

  public async getBooking(query: IGetBookingQuery): Promise<Booking> {
    try {
      const response: { data: any } = await this.httpClient.get(
        `${this.bookingUrl}/${query.BookingGuid}?restaurantGuid=${
          query.RestaurantGuid
        }`
      );
      const bookingMapper = BookingMapper.deserialize<BookingMapper>(
        response["data"]
      );

      return Booking.createFromMapper(bookingMapper);
    } catch (error) {
      throw new FindRecordError("Error while trying to get booking.", error);
    }
  }

  public async removeBooking(command: IRemoveBookingCommand): Promise<void> {
    try {
      await this.httpClient.delete(`${this.bookingUrl}/${command.BookingGuid}`);
    } catch (error) {
      throw new SaveRecordError("Error while trying to delete booking.", error);
    }
  }
}

export { RestaurantRepository };
