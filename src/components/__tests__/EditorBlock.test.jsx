let Colonel     = require('../../Colonel')
let DOM         = require('react-dom')
let EditorBlock = require('../EditorBlock')
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
    let element = DOM.findDOMNode(component)

    element.children.length.should.equal(2)
  })
})
