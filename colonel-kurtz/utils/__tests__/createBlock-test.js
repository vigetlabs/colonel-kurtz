jest.dontMock('../createBlock')
jest.dontMock('../../mixins/block_type')

describe('Utils - createBlock', function() {
  var React       = require('react')
  var BlockType   = require('../../mixins/block_type')
  var createBlock = require('../createBlock')

  it ('injects the BlockType mixin', function() {
    var Component = createBlock({

      getInitialState() {
        expect(this.editMode).toBeDefined()
        return {}
      }

    })

    var test = <Component />
  })

  it ('does not inject the BlockType mixin if it is already included', function() {
    var Component = createBlock({
      mixins: [ BlockType ]
    })

    // React will throw an error if the same mixin is included twice
    // due to namespace collisions. By creating the component, this
    // checks to make sure no collisions occur
    var test = <Component />
  })

})
