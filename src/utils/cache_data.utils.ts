let cacheData: { [key: string]: any} = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setKeyInCache = (key: string, value: any) => {
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
