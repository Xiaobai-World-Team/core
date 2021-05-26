/** app status */
export enum AppStatus {
 PRODUCTION = 'PRODUCTION',
 TEST = "TEST"
}

export interface IApp {
 appName: string
 appVersion: string
 jsEntry: string
 css: string[]
 favicon: string
 appStatus: AppStatus
}