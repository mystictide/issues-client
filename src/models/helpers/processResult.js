/**
 * ProcessStates
 * @param {(1|2)} type
 */
const ProcessState = {
  Success: 1,
  Error: 2,
};

/**
 * ProcessResult class
 */
export class ProcessResult {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {ProcessState|null} State
     * @property {string|null} Message
     */
    this.State = Entity.ProcessState ?? null;
    this.Message = Entity.Message ?? null;
  }
}
