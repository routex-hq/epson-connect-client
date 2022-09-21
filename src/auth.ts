import { EpsonError } from './error'
import { BASE_URL } from './request'

export type AuthOptions = {
    username?: string
    client_id: string
    client_secret: string
}
export type AuthResponse = {
    token_type: 'Bearer'
    access_token: string
    expires_in: number
    refresh_token?: string
    subject_type: string
    subject_id: string
}

export const authFlow = async (options: Required<AuthOptions>): Promise<Required<AuthResponse>> => {
    const pathname = '/api/1/printing/oauth2/auth/token?subject=printer'

    const body = new URLSearchParams()
    body.set('grant_type', 'password')
    body.set('username', options.username)
    body.set('password', '')

    const res = await fetch(BASE_URL + pathname, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa(`${options.client_id}:${options.client_secret}`),
        },
    })

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}

export const refresh = async (
    options: AuthOptions & { refresh_token: string },
): Promise<AuthResponse> => {
    const pathname = '/api/1/printing/oauth2/auth/token?subject=printer'

    const body = new URLSearchParams()
    body.set('grant_type', 'refresh_token')
    body.set('refresh_token', options.refresh_token)

    const res = await fetch(BASE_URL + pathname, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: 'Basic ' + btoa(`${options.client_id}:${options.client_secret}`),
        },
    })

    const json: any = await res.json()

    if (!res.ok) throw new EpsonError(pathname, res.status, res.statusText, json.code)

    return json
}
