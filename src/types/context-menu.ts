/**
 * Right-click menu item
 */
export interface IContextMenuItem {
  /** Make button gray */
  disable: boolean;
  /** Button icon */
  icon?: string;
  /* Button text */
  text: string;
  /** 
   * Usually positioned to the right to display shortcuts
   */
  describe?: string;
  /** callback */
  callback(): any;
  /** sub menu  */
  child?: IContextMenuItem[],
}

/**
 * Right-click menu
 */
export interface IContextMenu {
  /** Whether the  "right click menu" is visible */
  visible: boolean;
  /** The x coordinate of the menu  */
  x: number
  /** The y coordinate of the menu */
  y: number
  /** Menu list */
  menus: IContextMenuItem[]
}