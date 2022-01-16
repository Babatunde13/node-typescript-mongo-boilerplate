import axios from 'axios'

export const get = async (url: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const response = await axios.get(url, { headers })
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: e
        }
    }
}

export const post = async (url: string, body: any) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const response = await axios.post(url, body, { headers })
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: e
        }
    }
}
