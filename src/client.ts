import type { PrintMode } from './methods'
import { cancelJob, createJob, getJob, print, PrintSetting, upload } from './print'

export class Print {
    private token: string

    constructor(token: string) {
        this.token = token
    }

    public createJob(
        deviceId: string,
        jobName: string,
        printMode: PrintMode,
        setting: PrintSetting,
    ) {
        return createJob(this.token, deviceId, jobName, printMode, setting)
    }

    public upload(uploadUri: string, file: File) {
        return upload(uploadUri, file)
    }

    public print(deviceId: string, jobId: string) {
        return print(this.token, deviceId, jobId)
    }

    public cancel(deviceId: string, jobId: string) {
        return cancelJob(this.token, deviceId, jobId)
    }

    public getJob(deviceId: string, jobId: string) {
        return getJob(this.token, deviceId, jobId)
    }
}
