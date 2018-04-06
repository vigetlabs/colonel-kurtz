const React = require('react')
const DOM = require('react-dom')
const Embedded = require('../embedded')
const TestUtils = require('react-addons-test-utils')
const Simulate = TestUtils.Simulate
const render = TestUtils.renderIntoDocument

describe('Addons - Common - Embedded', function() {
  it('resolves urls to a baseUrl and slug', function() {
    const component = render(
      <Embedded name="test" baseUrl="test/" slug="1" onChange={sinon.stub()} />
    )

    component.getSrc().should.equal('test/1')
  })

  it('properly handles cases where the slug is zero', function() {
    const component = render(
      <Embedded name="test" slug={0} onChange={sinon.stub()} />
    )
    component.hasSlug().should.equal(true)
  })

  it('properly handles cases where the slug is undefined', function() {
    const component = render(
      <Embedded name="test" slug={undefined} onChange={sinon.stub()} />
    )
    component.hasSlug().should.equal(false)
  })

  it('properly handles cases where the slug is empty', function() {
    const component = render(
      <Embedded name="test" slug={''} onChange={sinon.stub()} />
    )
    component.hasSlug().should.equal(false)
  })

  it('allows url resolution to be overridden', function() {
    const resolver = () => 'test'
    const component = render(
      <Embedded
        name="test"
        resolveUrl={resolver}
        slug="1"
        onChange={sinon.stub()}
      />
    )

    component.getSrc().should.equal('test')
  })

  it('closes the frame if no slug is given', function() {
    const component = render(<Embedded name="test" onChange={sinon.stub()} />)

    component.frame.props.open.should.equal(false)
  })

  it('fires a change event with a key/value pair according to the given name', function(done) {
    const test = function(data) {
      data.test.should.equal('1')
      done()
    }

    const component = render(<Embedded name="test" onChange={test} slug="1" />)

    Simulate.change(DOM.findDOMNode(component.field.input))
  })
})
