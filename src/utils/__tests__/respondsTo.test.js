let respondsTo = require('../respondsTo')

describe('Utils - respondsTo', function() {
  it('returns true when a key is a function', function() {
    respondsTo({ test() {} }, 'test').should.equal(true)
  })

  it('returns false when a key is not a function', function() {
    respondsTo({ test() {} }, 'nope').should.equal(false)
  })

  it('returns false if the target is null', function() {
    respondsTo(null, 'test').should.equal(false)
  })

  it('returns false if the target is undefined', function() {
    respondsTo(undefined, 'test').should.equal(false)
  })
})
