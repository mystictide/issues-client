/**
 * Example class
 */
export class Example {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {string} Name
     * @property {ExampleState} State
     */
    this.ID = Entity?.ID ?? null;
    this.Name = Entity?.Name ?? "";
    this.State = Entity?.State ?? new ExampleState();
  }
}

/**
 * ExampleState class
 */
export class ExampleState {
  /**
   * @param {number} ID
   * @param {string} Name
   */
  constructor(ID, Name) {
    /**
     * @property {number} ID
     * @property {string} Name
     */
    this.ID = ID ?? 3;
    this.Name = Name ?? "";
  }
}

export const StatesList = [
  {
    ID: "1",
    Name: "Test",
  },
  {
    ID: "2",
    Name: "Test2",
  },
];
