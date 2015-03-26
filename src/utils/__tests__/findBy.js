import findBy from 'utils/findBy'

describe('Utils - findBy', function() {

  let list = [{ id: 'one', color: 'blue' }, { id: 'two', color: 'red' }]

  it ('can find a record matching a key value pair', function() {
    findBy(list, 'blue', 'color').id.should.equal('one')
  })

  it ('can find a record matching an id if no key is provided', function() {
    findBy(list, 'one').color.should.equal('blue')
  })

  it ('throws an error if no match is found', function(done) {
    try {
      findBy(list, 'three')
    } catch(x) {
      done()
    }
  })

})
