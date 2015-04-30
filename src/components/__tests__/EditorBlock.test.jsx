let Colonel     = require('../../Colonel')
let EditorBlock = require('../EditorBlock')
let TestUtils   = React.addons.TestUtils
let config      = require('./fixtures/colonelConfig')
let render      = TestUtils.renderIntoDocument

describe('Components - EditorBlock', function() {
  let app;

  beforeEach(function(done) {
    app = new Colonel(config)
    app.start(done)
  })

  it ('renders child blocks', function() {
    let block = app.get('blocks')[0]
    let component = render(<EditorBlock app={ app } block={ block } />)

    component.refs.children.props.children.length.should.equal(2)
  })
})
