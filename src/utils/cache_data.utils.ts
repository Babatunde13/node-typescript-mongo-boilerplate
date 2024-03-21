import { RedisClientType, createClient } from 'redis'

let cacheData: { [key: string]: unknown} = {}

export const setKeyInCache = (key: string, value: unknown) => {
    cacheData[key] = value
}

export const getKeyInCache = (key: string) => {
    return cacheData[key]
}

/**
 * @description - This function is used to clear the cache data
 */
export const resetCache = () => {
    cacheData = {}
}

export class RedisClient {
    uri: string
    connected = false
    client: RedisClientType

    static createClient(url: string) {
        return new RedisClient(url)
    }

    constructor(url: string) {
        this.uri = url
    }

    async connect() {
        const client = createClient({
            url: this.uri
        })

        client.on('connect', () => {
            this.connected = true
        })
        return client
    }

    async disconnect() {
        if (!this.connected) {
            return
        }

        this.client.quit()
        this.connected = false
    }

    async set(key: string, value: string) {
        if (!this.connected) {
            return
        }

        this.client.set(key, value)
    }

    async get(key: string) {
        if (!this.connected) {
            return
        }

        return this.client.get(key)
    }

    async clear () {
        if (!this.connected) {
            return
        }

        this.client.flushAll()
    }
}

export default RedisClient
