import forward from '../forward'

describe('migrate forward', function() {

  it ('only migrates to versions greater than the data', function() {
    let data   = { data: 'yes' }
    let result = forward('5.0.0', data, [
      { version: '2.0.0' }
    ])

    result.should.equal(data)
  })

  it ('can run through a set of migrations', function() {
    let data   = { count: 2 }
    let result = forward('2.0.0', data, [
      { version: '5.0.0', up: (data) => (data.count + 3) },
      { version: '7.0.0', up: (data) => (data + 2) }
    ])

    result.should.equal(7)
  })

})
