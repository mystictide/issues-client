/**
 * User class for the client
 */
export class User {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number|null} ID
     * @property {Company|null} Company
     * @property {string|null} FirstName
     * @property {string|null} LastName
     * @property {string|null} Email
     * @property {int} Role
     * @property {string|null} Token
     */
    this.ID = Entity.ID ?? null;
    this.Company = Entity.Company ?? null;
    this.FirstName = Entity.FirstName ?? null;
    this.LastName = Entity.LastName ?? null;
    this.Email = Entity.Email ?? null;
    this.Role = Entity.Role ?? 1;
    this.Token = Entity.Token ?? null;
  }
}

/**
 * User with a password for the server
 */
export class ServerUser {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {User|null} User
     * @property {string|null} Password
     */
    this.User = Entity.User ?? null;
    this.Password = Entity.Password ?? null;
  }
}
