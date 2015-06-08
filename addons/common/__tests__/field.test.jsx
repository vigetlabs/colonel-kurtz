let Field     = require('../field')
let TestUtils = React.addons.TestUtils
let render    = TestUtils.renderIntoDocument

describe('Addons - Common - Field', function () {
  it ('defaults to input element', function() {
    let component = render(<Field label="Test" />)
    let tag = component.getDOMNode().querySelector(".col-field-input").tagName
    tag.should.equal('INPUT')
  })

  it ('uses element instead of input if provided', function() {
    let component = render(<Field element='textarea' label="Test" />)
    let tag = component.getDOMNode().querySelector(".col-field-input").tagName
    tag.should.equal('TEXTAREA')
  })

  it ('falls back to the name property when getting an id', function() {
    let component = render(<Field label="Test" name="test" />)
    let input = component.getDOMNode().querySelector(".col-field-input")
    let label = component.getDOMNode().querySelector(".col-field-label")

    label.htmlFor.should.equal(input.id)
  })

  it ('falls back to the label property when getting an id with no name', function() {
    let component = render(<Field label="Test" />)
    let input = component.getDOMNode().querySelector(".col-field-input")
    let label = component.getDOMNode().querySelector(".col-field-label")

    label.htmlFor.should.equal(input.id)
  })
})
