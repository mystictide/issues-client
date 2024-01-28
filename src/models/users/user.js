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
     * @property {string|null} Username
     * @property {string|null} Email
     * @property {number} AuthType
     * @property {string|null} Token
     */
    this.ID = Entity.ID ?? null;
    this.Username = Entity.Username ?? null;
    this.Email = Entity.Email ?? null;
    this.AuthType = Entity.AuthType ?? 1;
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
