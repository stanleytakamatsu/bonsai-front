import { RestaurantMapper } from "../Repository/Mapper/RestaurantMapper";

class Restaurant {
  private guid: string;

  private name: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Name(): string {
    return this.name;
  }

  public static createFromMapper(mapper: RestaurantMapper): Restaurant {
    const restaurant = new Restaurant();

    restaurant.guid = mapper.Guid;
    restaurant.name = mapper.Name;

    return restaurant;
  }
}

export { Restaurant };
