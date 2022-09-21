import { EpsonError } from './error'
import { request } from './request'

export type PrintMode = 'document' | 'photo'
export type MediaType = {
    media_type: string
    borderless: boolean
    sources: string[]
    print_qualities: string[]
    '2_sided': boolean
}
export type MediaSize = {
    media_size: string
    media_types: MediaType[]
}
export type CapabilityResponse = {
    color_modes: string[]
    media_sizes: MediaSize[]
}
export type DeviceInfoResponse = {
    printer_name: string
    serial_no: string
    ec_connected: boolean
}

export const capability = async (
    token: string,
    deviceId: string,
    printMode: PrintMode,
): Promise<CapabilityResponse> => {
    const pathname = `/api/1/printing/printers/${deviceId}/capability/${printMode}`
    const res = await request(token, pathname)

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}

export const deviceInfo = async (token: string, deviceId: string): Promise<DeviceInfoResponse> => {
    const pathname = `/api/1/printing/printers/${deviceId}`
    const res = await request(token, pathname)

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}
