import axios from 'axios'

export const get = async <T=unknown>(url: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const response = await axios.get<T>(url, { headers })
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: e
        }
    }
}

export const post = async <T=unknown>(url: string, body: unknown) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const response = await axios.post<T>(url, body, { headers })
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: e
        }
    }
}
