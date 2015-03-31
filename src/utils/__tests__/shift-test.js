import shift from 'utils/shift'

describe('Utils - insertAt', function() {
  let list = ['a', 'b', 'c']

  it ('can shift an item given a delta', function() {
    let result = shift(list, 'a', 1)
    result.should.eql(['b', 'a', 'c'])
  })

  it ('does nothing if no delta is given', function() {
    let result = shift(list, 'a')
    result.should.eql(list)
  })

  it ('does not shift an item less than the first', function() {
    let result = shift(list, 'a', -1)
    result.should.eql(['a', 'b', 'c'])
  })

  it ('does not shift an greater than the length', function() {
    let result = shift(list, 'a', 40)
    result.should.eql(['b', 'c', 'a'])
  })

})
