jest.dontMock('../addBlockType')

// Necessary polyfill
Object.assign = require('object-assign')

describe('Utils - addBlockType', function() {
  var React            = require('react')
  var BlockTypeActions = require('../../actions/block_type_actions')
  var createBlock      = require('../createBlock')
  var addBlockType     = require('../addBlockType')

  it ('invokes the BlockTypeActions.create action', function() {
    var component = React.createClass({
      render() {
        return (<p>foo</p>)
      }
    })

    addBlockType('test', component)

    expect(BlockTypeActions.create).toBeCalled()
  })

  it ('if given an invalid react element, it attempts to make one', function() {
    addBlockType('test', {})
    expect(createBlock).toBeCalled()
  })

})
