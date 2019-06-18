import { TableMapper } from "../Repository/Mapper/TableMapper";

class Table {
  private guid: string;

  private code: string;

  public get Guid(): string {
    return this.guid;
  }

  public get Code(): string {
    return this.code;
  }

  public static createFromMapper(mapper: TableMapper): Table {
    const table = new Table();

    table.guid = mapper.Guid;
    table.code = mapper.Code;

    return table;
  }
}

export { Table };
