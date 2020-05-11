import Block from '../Block'
import React from 'react'
import Colonel from '../../Colonel'
import DOM from 'react-dom'
import config from './fixtures/colonelConfig'
import TestUtils from 'react-dom/test-utils'

const render = TestUtils.renderIntoDocument

describe('Components - Block', function () {
  let app, component

  beforeEach(function () {
    app = new Colonel(config)
    component = render(<Block app={app} block={app.state.blocks[0]} />)
  })

  it('assigns default content to the block', function () {
    let block = component.props.block

    expect(block.content).toHaveProperty('text', 'Test')
  })

  it('adds a class name according to the block id', function () {
    let block = component.props.block
    let element = DOM.findDOMNode(component)
    let child = element.querySelector('.col-block')

    expect(child.className).toContain(block.type)
  })

  it('updates a block when it changes', function () {
    component._onChange({ fiz: 'buzz' })
    expect(component).toHaveProperty('props.block.content.fiz', 'buzz')
  })

  it('passes menu items from the block type component to the menu', function () {
    let { menu } = component

    component.setState({ menuOpen: true })

    expect(menu).toHaveProperty('test')
  })

  it('respects default the content prop', function () {
    let { block } = component

    expect(block).toHaveProperty('props.content.text', 'Test')
  })
})
