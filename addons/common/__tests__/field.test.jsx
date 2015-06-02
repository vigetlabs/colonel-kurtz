let Field     = require('../field')
let TestUtils = React.addons.TestUtils
let render    = TestUtils.renderIntoDocument

describe('Addons - Common - Field', function () {
  it ('defaults to input element', function() {
    let component = render(<Field />)
    let tag = component.getDOMNode().querySelector(".col-field-input").tagName
    tag.should.equal('INPUT')
  })

  it ('uses element instead of input if provided', function() {
    let component = render(<Field element='textarea' />)
    let tag = component.getDOMNode().querySelector(".col-field-input").tagName
    tag.should.equal('TEXTAREA')
  })
})
