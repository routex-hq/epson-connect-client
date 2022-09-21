import { EpsonError } from './error'
import type { PrintMode } from './methods'
import { request } from './request'

export type PrintSetting = {
    media_size: string
    media_type: string
    borderless: boolean
    print_quality: string
    source: string
    color_mode: string
    '2_sided': 'none' | 'long' | 'short'
    reverse_order: boolean
    copies: number
    collate: boolean
}
export type CreateJobResponse = {
    id: string
    upload_uri: string
}
export type JobResponse = {
    status: string
    status_reason: string
    start_date: string
    job_name: string
    total_pages: number
    update_date: string
}

export const createJob = async (
    token: string,
    deviceId: string,
    jobName: string,
    printMode: PrintMode,
    setting: PrintSetting,
): Promise<CreateJobResponse> => {
    const pathname = `/api/1/printing/printers/${deviceId}/jobs`
    const body = {
        job_name: jobName,
        print_mode: printMode,
        print_setting: setting,
    }
    const res = await request(token, pathname, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}

export const print = async (token: string, deviceId: string, jobId: string) => {
    const pathname = `/api/1/printing/printers/${deviceId}/jobs/${jobId}/print`

    const res = await request(token, pathname, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    })

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText)

    return
}

export const cancelJob = async (
    token: string,
    deviceId: string,
    jobId: string,
    operatedBy?: 'user' | 'operater',
) => {
    const pathname = `/api/1/printing/printers/${deviceId}/jobs/${jobId}/cancel`

    const res = await request(token, pathname, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            operated_by: operatedBy,
        }),
    })

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}

export const getJob = async (
    token: string,
    deviceId: string,
    jobId: string,
): Promise<JobResponse> => {
    const pathname = `/api/1/printing/printers/${deviceId}/jobs/${jobId}`

    const res = await request(token, pathname, {
        method: 'GET',
    })

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}

export const upload = async (uploadUri: string, file: File) => {
    const url = new URL(uploadUri)

    url.searchParams.append('File', `1.${file.name.split('.').slice(-1)[0]}`)

    const res = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': file.size.toString(),
        },
        body: await file.arrayBuffer(),
    })

    if (!res.ok) throw new EpsonError(url.pathname, res.status, res.statusText)
}
