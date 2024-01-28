/**
 * Page class
 */
export class Page {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number} TotalItems
     * @property {number} CurrentPage
     * @property {number} PageSize
     * @property {number} TotalPages
     * @property {number} StartPage
     * @property {number} EndPage
     * @property {number} StartIndex
     * @property {number} EndIndex
     * @property {array|null} Pages
     */
    this.TotalItems = Entity.TotalItems ?? 0;
    this.CurrentPage = Entity.CurrentPage ?? 1;
    this.PageSize = Entity.PageSize ?? 1;
    this.TotalPages = Entity.TotalPages ?? 1;
    this.StartPage = Entity.StartPage ?? 1;
    this.EndPage = Entity.EndPage ?? 1;
    this.StartIndex = Entity.StartIndex ?? 1;
    this.EndIndex = Entity.EndIndex ?? 1;
    this.Pages = Entity.Pages ?? [];
  }
}

/**
 * Filter class
 */
export class Filter {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {number} ID
     * @property {string|null} Keyword
     * @property {string} SortBy
     * @property {number} Page
     * @property {number} PageSize
     * @property {Page} Pager
     */
    this.ID = Entity.ID ?? 0;
    this.Keyword = Entity.Keyword ?? null;
    this.SortBy = Entity.SortBy ?? "desc";
    this.Page = Entity.Page ?? 1;
    this.PageSize = Entity.PageSize ?? 0;
    this.Pager = Entity.Pager ?? new Page();
  }
}

/**
 * FilteredList class
 */
export class FilteredList {
  /**
   * @param {Object} Entity
   */
  constructor(Entity) {
    /**
     * @property {array} Data
     * @property {number} TotalItems
     * @property {Filter} Filter
     * @property {T|null} FilterModel
     */
    this.Data = Entity.Data ?? [];
    this.TotalItems = Entity.TotalItems ?? 0;
    this.Filter = Entity.Filter ?? new Filter();
    this.FilterModel = Entity.FilterModel ?? null;
  }
}
