import App        from '../app'
import BlockStore from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - App', function() {

  it ('can render when given a block', function() {
    TestUtils.renderIntoDocument(<App block={ BlockStore._create({}) } />)
  })
})
