import { Serializer } from "../../../../Core/Serialize/Serializer";
import { deserialize } from "cerialize";

class BookingMapper extends Serializer {
  @deserialize
  private guid: string;

  @deserialize
  private name: string;

  @deserialize
  private email: string;

  @deserialize
  private bookingDate: string;

  @deserialize
  private bookingTime: string;

  @deserialize
  private table: string;

  @deserialize
  private createdAt: string;

  @deserialize
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
}

export { BookingMapper };
