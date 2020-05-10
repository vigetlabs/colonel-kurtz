import React from 'react'
import DOM from 'react-dom'
import Embedded from '../embedded'
import TestUtils from 'react-dom/test-utils'

const Simulate = TestUtils.Simulate
const render = TestUtils.renderIntoDocument

describe('Addons - Common - Embedded', function () {
  it('resolves urls to a baseUrl and slug', function () {
    const component = render(
      <Embedded name="test" baseUrl="test/" slug="1" onChange={jest.fn()} />
    )

    expect(component.getSrc()).toEqual('test/1')
  })

  it('properly handles cases where the slug is zero', function () {
    const component = render(
      <Embedded name="test" slug={0} onChange={jest.fn()} />
    )
    expect(component.hasSlug()).toEqual(true)
  })

  it('properly handles cases where the slug is undefined', function () {
    const component = render(
      <Embedded name="test" slug={undefined} onChange={jest.fn()} />
    )
    expect(component.hasSlug()).toEqual(false)
  })

  it('properly handles cases where the slug is empty', function () {
    const component = render(
      <Embedded name="test" slug={''} onChange={jest.fn()} />
    )
    expect(component.hasSlug()).toEqual(false)
  })

  it('allows url resolution to be overridden', function () {
    const resolver = () => 'test'
    const component = render(
      <Embedded
        name="test"
        resolveUrl={resolver}
        slug="1"
        onChange={jest.fn()}
      />
    )

    expect(component.getSrc()).toEqual('test')
  })

  it('closes the frame if no slug is given', function () {
    const component = render(<Embedded name="test" onChange={jest.fn()} />)

    expect(component.frame.props.open).toEqual(false)
  })

  it('fires a change event with a key/value pair according to the given name', function (done) {
    const test = function (data) {
      expect(data.test).toEqual('1')
      done()
    }

    const component = render(<Embedded name="test" onChange={test} slug="1" />)

    Simulate.change(DOM.findDOMNode(component.field.input))
  })
})
