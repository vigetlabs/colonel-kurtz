import BlockType   from 'mixins/block_type'
import createBlock from 'utils/createBlock'

let Test = React.addons.TestUtils

describe('Utils - createBlock', function() {

  it ('injects the BlockType mixin', function() {
    var Component = createBlock({

      getInitialState() {
        this.editMode.should.not.be.undefined
        return {}
      },
      render() { return null }
    })

    let test = <Component />
  })

  it ('does not inject the BlockType mixin if it is already included', function() {
    var Component = createBlock({
      mixins: [ BlockType ],
      render() { return null }
    })

    // React will throw an error if the same mixin is included twice
    // due to namespace collisions. By creating the component, this
    // checks to make sure no collisions occur
    let test = <Component />
  })

})
