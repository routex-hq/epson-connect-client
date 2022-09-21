export const BASE_URL = 'https://api.epsonconnect.com'

export const request = (token: string, path: string, options?: RequestInit) => {
    const url = path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`

    options = options || {}
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    }

    return fetch(url, options)
}
