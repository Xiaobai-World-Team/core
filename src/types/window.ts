import { IContextMenuItem } from "../kernel/context-menus/types";

Object.defineProperty(window, 'xiaobaiApi', { value: {} })
declare global {
  interface Window {
    /** Xiaobai API */
    xiaobaiApi: IXiaobaiApi;
  }
}


/**
 * Type of background
 */
export enum EWindowBackgroundType {
  /** Desktop video */
  video = 'video',
  /** Desktop picture */
  image = 'image'
}

/**
 * Metadata for Windows
 */
export interface IWindow {
  /** The background configuration of the current desktop window */
  background: {
    /** type of background */
    type: EWindowBackgroundType,
    /** inline css */
    css: string,
  }
}

/** Xiaobai API */
export interface IXiaobaiApi {
  /* Show Popup Menu */
  TrackPopupMenu(menus: IContextMenuItem[]): void
}
