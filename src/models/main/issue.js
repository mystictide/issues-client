/**
 * Issue class
 */
export class IssueClass {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {Project|null} Project
     * @property {string|null} Title
     * @property {string|null} Description
     * @property {Types} Type
     * @property {States} Status
     * @property {Priorities} Priority
     * @property {Users} CreatedBy
     * @property {Users[]} AssignedTo
     * @property {Date} CreatedDate
     * @property {Date} EndDate
     */
    this.ID = Entity?.ID ?? 0;
    this.Project = Entity?.Project ?? null;
    this.Title = Entity?.Title ?? null;
    this.Description = Entity?.Description ?? null;
    this.Type = Entity?.Type ?? Types;
    this.Status = Entity?.Status ?? States;
    this.Priority = Entity?.Priority ?? Priorities;
    this.CreatedBy = Entity?.CreatedBy ?? null;
    this.AssignedTo = Entity?.AssignedTo ?? null;
    this.CreatedDate = Entity?.CreatedDate ?? null;
    this.EndDate = Entity?.EndDate ?? null;
  }
}

export const Types = [
  {
    ID: 1,
    Value: "Bug",
  },
  {
    ID: 2,
    Value: "Feature",
  },
  {
    ID: 3,
    Value: "Enhancement",
  },
  {
    ID: 4,
    Value: "Task",
  },
];

export const States = [
  {
    ID: 1,
    Value: "Open",
  },
  {
    ID: 2,
    Value: "In Progress",
  },
  {
    ID: 3,
    Value: "Closed",
  },
];

export const Priorities = [
  {
    ID: 1,
    Value: "High",
  },
  {
    ID: 2,
    Value: "Medium",
  },
  {
    ID: 3,
    Value: "Low",
  },
];
