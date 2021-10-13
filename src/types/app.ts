/** app status */
export enum AppStatus {
 PRODUCTION = 'PRODUCTION',
 TEST = "TEST"
}

import { IWindow } from "@xiaobai-world/api";
import { Assign } from "utility-types";

/**
 * App实例
 */
export type IApp =
 Assign<
  Pick<
   IWindow,
   'name' |
   'title' |
   'jsEntry' |
   'css' |
   'icon' |
   'initialWidth' |
   'initialHeight' |
   'appRootPath'
  >, {
   _id: string,
   version: string,
   appStatus: string
  }>;
