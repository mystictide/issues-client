/**
 * Project class
 */
export class ProjectClass {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {number|null} CompanyID
     * @property {number|null} AssignedTo
     * @property {string|null} Name
     * @property {string|null} Description
     * @property {Date} CreatedDate
     * @property {Date} EndDate
     */
    this.ID = Entity?.ID ?? 0;
    this.CompanyID = Entity?.CompanyID ?? 0;
    this.AssignedTo = Entity?.AssignedTo ?? 0;
    this.Name = Entity?.Name ?? null;
    this.Description = Entity?.Description ?? null;
    this.CreatedDate = Entity?.CreatedDate ?? null;
    this.EndDate = Entity?.EndDate ?? null;
  }
}
