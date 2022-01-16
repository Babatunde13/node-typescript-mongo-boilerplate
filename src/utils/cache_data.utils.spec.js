import { setKeyInCache, getKeyInCache, resetCache } from './cache_data.utils'
import expect from '../shared/test_utils/expect'

describe('Cache Data', () => {
    beforeEach(() => {
        // Clear the cache before each test
        resetCache()
    })
    
    it('should set and get data', () => {
        // Set data
        setKeyInCache('key', 'value')
        // Get data
        expect(getKeyInCache('key')).toBe('value')
    })
    
    it('should set and get multiple data', () => {
        // Set data
        setKeyInCache('key1', 'value1')
        setKeyInCache('key2', 'value2')
        // Get data
        expect(getKeyInCache('key1')).toBe('value1')
        expect(getKeyInCache('key2')).toBe('value2')
    })

    it('should reset cache', () => {
        // Set data
        setKeyInCache('key1', 'value1')
        setKeyInCache('key2', 'value2')
        expect(getKeyInCache('key1')).toBe('value1')
        expect(getKeyInCache('key2')).toBe('value2')
        // Reset cache
        resetCache()
        // Get data
        expect(getKeyInCache('key1')).toBe(undefined)
        expect(getKeyInCache('key2')).toBe(undefined)
    })
})
