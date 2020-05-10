import React from 'react'
import Field from '../field'
import TestUtils from 'react-dom/test-utils'
import DOM from 'react-dom'

const render = TestUtils.renderIntoDocument

describe('Addons - Common - Field', function () {
  it('defaults to input element', function () {
    let component = render(<Field />)
    let tag = DOM.findDOMNode(component.input).tagName
    expect(tag).toEqual('INPUT')
  })

  it('uses element instead of input if provided', function () {
    let component = render(<Field element="textarea" />)
    let tag = DOM.findDOMNode(component.input).tagName

    expect(tag).toEqual('TEXTAREA')
  })

  it('passes props through to the input ref', function () {
    let component = render(<Field type="number" />)

    expect(component.input.type).toEqual('number')
  })

  it('sets up aria-describeby for hints', function () {
    let component = render(<Field hint="Yes" autoFocus />)
    let el = DOM.findDOMNode(component)
    let hint = el.querySelector('.col-field-hint')
    let input = el.querySelector('.col-field-input')

    expect(hint.id).toEqual(input.getAttribute('aria-describedby'))
  })

  it('sets up a unique id', function () {
    let component = render(<Field />)
    let label = DOM.findDOMNode(component)
    let input = label.querySelector('.col-field-input')

    expect(input.hasAttribute('id')).toBe(true)
    expect(label.getAttribute('for')).toEqual(input.id)
  })

  it('respects a given id attribute', function () {
    let component = render(<Field id="test" />)
    let label = DOM.findDOMNode(component)
    let input = label.querySelector('.col-field-input')

    expect(input.getAttribute('id')).toBe('test')
    expect(label.getAttribute('for')).toEqual(input.id)
  })
})
