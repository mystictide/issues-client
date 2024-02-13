/**
 * Role class
 */
export class RoleClass {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {number|null} CompanyID
     * @property {string|null} Name
     * @property {number[]} Attributes
     */
    this.ID = Entity?.ID ?? 0;
    this.CompanyID = Entity?.CompanyID ?? 0;
    this.Name = Entity?.Name ?? null;
    this.Attributes = Entity?.Attributes ?? RoleAttributes;
  }
}

export const RoleAttributes = [
  {
    ID: 1,
    Value: "Has full access to all features and data",
  },
  {
    ID: 2,
    Value: "Can manage users",
  },
  {
    ID: 3,
    Value: "Can create, edit and delete projects and issues",
  },
  {
    ID: 4,
    Value: "Can create, edit and close issues",
  },
  {
    ID: 5,
    Value: "Can assign users to issues",
  },
];
