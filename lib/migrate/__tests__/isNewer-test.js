import isNewer from '../isNewer'

describe('isNewer', function() {

  it ('defaults to 0.0.0 for the given version', function() {
    isNewer(null, '4.0.0').should.equal(false)
    isNewer('4.0.0', null).should.equal(true)
  })

  it ('checks major versions', function() {
    isNewer('15.0.0', '4.0.0').should.equal(true)
    isNewer('2.0.0', '4.0.0').should.equal(false)
  })

  it ('checks minor versions', function() {
    isNewer('1.31.0', '1.2.0').should.equal(true)
    isNewer('1.0.0', '1.1.0').should.equal(false)
  })

  it ('checks patches', function() {
    isNewer('1.3.12', '1.3.9').should.equal(true)
    isNewer('1.0.0', '1.0.1').should.equal(false)
  })

})
