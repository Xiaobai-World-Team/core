Object.defineProperty(window, 'xiaobaiApi', { value: {} })

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
