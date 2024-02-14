import { UserClass } from "../users/user";

/**
 * Comment class
 */
export class CommentClass {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {number|null} IssueID
     * @property {User|null} User
     * @property {string|null} Body
     * @property {Date} CreatedDate
     */
    this.ID = Entity?.ID ?? 0;
    this.IssueID = Entity?.IssueID ?? 0;
    this.User = Entity?.User ?? new UserClass();
    this.Body = Entity?.Body ?? null;
    this.CreatedDate = Entity?.CreatedDate ?? null;
  }
}
