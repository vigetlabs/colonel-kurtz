import respondsTo from '../respondsTo'

describe('Utils - respondsTo', function() {
  it('returns true when a key is a function', function() {
    expect(respondsTo({ test() {} }, 'test')).toEqual(true)
  })

  it('returns false when a key is not a function', function() {
    expect(respondsTo({ test() {} }, 'nope')).toEqual(false)
  })

  it('returns false if the target is null', function() {
    expect(respondsTo(null, 'test')).toEqual(false)
  })

  it('returns false if the target is undefined', function() {
    expect(respondsTo(undefined, 'test')).toEqual(false)
  })
})
