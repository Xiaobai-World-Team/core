/** app status */
export enum AppStatus {
 PRODUCTION = 'PRODUCTION',
 TEST = "TEST"
}

export interface IApp {
 _id: string;
 name: string
 version: string
 title: string
 jsEntry: string
 css: string[]
 favicon: string
 appStatus: AppStatus
 appRootPath: string
}