import transformer from '../transformer'

describe('migration transformer', function() {

  it ('only migrates to versions greater than the data', function() {
    let data = { version: '5.0.0', data: 'yes' }
    let result = transformer(data, [
      { version: '2.0.0' }
    ])

    result.should.equal(data)
  })

  it ('can run through a set of migrations', function() {
    let data = { version: '2.0.0', count: 2 }
    let result = transformer(data, [
      { version: '5.0.0', up: (data) => (data.count + 3) },
      { version: '7.0.0', up: (data) => (data + 2) }
    ])

    result.should.equal(7)
  })

})
