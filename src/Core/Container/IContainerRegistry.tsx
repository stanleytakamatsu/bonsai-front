interface IContainerRegistry {
  registerAll(): void;
}

const IContainerRegistry = Symbol.for('IContainerRegistry');

export { IContainerRegistry };
