import { BookingMapper } from "../Repository/Mapper/BookingMapper";

class Booking {
  private guid: string;

  private name: string;

  private email: string;

  private bookingDate: string;

  private bookingTime: string;

  private table: string;

  private createdAt: string;

  private updatedAt: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public get BookingDate(): string {
    return this.bookingDate;
  }

  public get BookingTime(): string {
    return this.bookingTime;
  }

  public get Table(): string {
    return this.table;
  }

  public get CreatedAt(): string {
    return this.createdAt;
  }

  public get UpdatedAt(): string {
    return this.updatedAt;
  }

  public static createFromMapper(mapper: BookingMapper): Booking {
    const booking = new Booking();

    booking.guid = mapper.Guid;
    booking.name = mapper.Name;
    booking.email = mapper.Email;
    booking.bookingDate = mapper.BookingDate;
    booking.bookingTime = mapper.BookingTime;
    booking.table = mapper.Table;
    booking.createdAt = mapper.CreatedAt;
    booking.updatedAt = mapper.UpdatedAt;

    return booking;
  }
}

export { Booking };
