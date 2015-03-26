import insertAt from 'utils/insertAt'

describe('Utils - insertAt', function() {
  let list = [1, 2, 3, 4, 5]

  it ('can insert an item at a given position', function() {
    let result = insertAt(list, 'injection', 2)

    result[2].should.equal('injection')
  })

  it ('appends to the end of the list of no position is provided', function() {
    let result = insertAt(list, 'injection')
    result[result.length - 1].should.equal('injection')
  })

})
