jest.dontMock('../block_type_store')

describe('Stores - Block Type', function() {

  it ('can create a record', function() {
    var BlockTypeStore = require('../block_type_store')
    var React = require('react')

    BlockTypeStore._create({
      id: 'foo',
      component: React.createClass({ render() { return (<p>Test</p>) }})
    })

    expect(BlockTypeStore.find('foo')).not.toEqual(null)
  })

  it ('can get a list of all ids', function() {
    var BlockTypeStore = require('../block_type_store')
    var React = require('react')

    BlockTypeStore._create({
      id: 'foo',
      component: React.createClass({ render() { return (<p>Test</p>) }})
    })

    expect(BlockTypeStore.keys()).toEqual([ 'foo' ])
  })

})
