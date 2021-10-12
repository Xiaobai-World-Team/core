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
 initialWidth: number;
 initialHeight: number;
 appStatus: AppStatus
 appRootPath: string
}