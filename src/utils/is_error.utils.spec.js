import isError from './is_error.utils'
import expect from '../shared/test_utils/expect'

describe('isError', () => {
    it('should return true if data is undefined', () => {
        expect(isError()).toBe(true)
    })

    it('should return true if data the error property of data is an Error', () => {
        expect(isError({ error: Error('something went wrong') })).toBe(true)
    })

    it('should return false if data the error property of data is an not an Error', () => {
        expect(isError({ error: 'something went wrong' })).toBe(false)
    })

    it('should return false if data noes not have an error property', () => {
        expect(isError({ data: 'something went wrong' })).toBe(false)
    })
})
