interface ISerializer {
  serialize(data: any): any;
}

const ISerializer = Symbol.for('ISerializer');
const IFromJson = Symbol.for('IFromJson');

export { ISerializer, IFromJson };
