let Colonel   = require('../../Colonel')
let Item      = require('../MenuItem')
let TestUtils = React.addons.TestUtils
let config    = require('./fixtures/colonelConfig')
let render    = TestUtils.renderIntoDocument

describe('Components - Menu Item', function() {
  let app;

  beforeEach(function(done) {
    app = new Colonel(config)
    app.start(done)
  })

  it ('has a default noop onClick prop', function() {
    let block = app.state.blocks[0]
    let item  = render(<Item app={ app } block={ block } id="id" label="test" />)

    item.props.onClick()
  })

  it ('has a default noop isDisabled prop', function() {
    let block = app.state.blocks[0]
    let item  = render(<Item app={ app } block={ block } id="id" label="test" />)

    expect(item.props.isDisabled()).to.not.be.defined
  })

})
