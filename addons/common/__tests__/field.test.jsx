const Field  = require('../field')
const render = TestUtils.renderIntoDocument
const DOM    = require('react-dom')

describe('Addons - Common - Field', function () {
  it ('defaults to input element', function() {
    let component = render(<Field />)
    let tag = DOM.findDOMNode(component.refs.input).tagName
    tag.should.equal('INPUT')
  })

  it ('uses element instead of input if provided', function() {
    let component = render(<Field element='textarea' />)
    let tag = DOM.findDOMNode(component.refs.input).tagName

    tag.should.equal('TEXTAREA')
  })

  it ('passes props through to the input ref', function() {
    let component = render(<Field type="number" />)

    component.refs.input.type.should.equal('number')
  })

  it ('sets up aria-describeby for hints', function() {
    let component = render(<Field hint="Yes" autofocus />)
    let el = DOM.findDOMNode(component)
    let hint = el.querySelector('.col-field-hint')
    let input = el.querySelector('.col-field-input')

    hint.id.should.equal(input.getAttribute('aria-describedby'))
  })
})
