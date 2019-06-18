import IGetRestaurantByGuidQuery from "./IGetRestaurantByGuidQuery";

class GetRestaurantByGuidQuery implements IGetRestaurantByGuidQuery {
  private guid: string;

  public get RestaurantGuid(): string {
    return this.guid;
  }

  public static create(guid: string): GetRestaurantByGuidQuery {
    const command = new GetRestaurantByGuidQuery();

    command.guid = guid;

    return command;
  }
}

export { GetRestaurantByGuidQuery };
