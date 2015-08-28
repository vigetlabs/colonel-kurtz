let Field  = require('../field')
let render = React.addons.TestUtils.renderIntoDocument

describe('Addons - Common - Field', function () {
  it ('defaults to input element', function() {
    let component = render(<Field />)
    let tag = component.refs.input.getDOMNode().tagName
    tag.should.equal('INPUT')
  })

  it ('uses element instead of input if provided', function() {
    let component = render(<Field element='textarea' />)
    let tag = component.refs.input.getDOMNode().tagName
    tag.should.equal('TEXTAREA')
  })

  it ('passes props through to the input ref', function() {
    let component = render(<Field autofocus />)

    component.refs.input.props.autofocus.should.equal(true)
  })

  it ('sets up aria-describeby for hints', function() {
    let component = render(<Field hint="Yes" autofocus />)
    let el = React.findDOMNode(component)
    let hint = el.querySelector('.col-field-hint')
    let input = el.querySelector('.col-field-input')

    hint.id.should.equal(input.getAttribute('aria-describedby'))
  })
})
