import React from 'react'
import Colonel from '../../Colonel'
import DOM from 'react-dom'
import BlockMenu from '../BlockMenu'
import Actions from '../../actions/blocks'
import config from './fixtures/colonelConfig'
import TestUtils from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

function renderBlockMenu(props) {
  return TestUtils.renderIntoDocument(
    <BlockMenu block={props.app.state.blocks[0]} {...props} />
  )
}

/**
 * Reach UI MenuItem expects a reasonable simulation of a user click (including
 * e.g. mouseDown and other related events). TestUtils.Simulate.click is therefore
 * insufficient. @testing-library/user-event solves this problem by providing
 * a higher-level API that attempts to more closely simulate user interactions
 * with documents. However, it expects that there is a currently focused element
 * (document.activeElement) and errors attempting to fire an event on `null`. To
 * workaround this limitation we just focus the node we're about to test to avoid
 * this problematic codepath.
 *
 * TODO(shawk): replace react-dom/test-utils with @testing-library/react.
 */
function hack(node) {
  node.focus()
  return node
}

describe('Components - BlockMenu', function () {
  let app

  beforeEach(function () {
    app = new Colonel(config)
    jest.spyOn(app, 'push')
  })

  it('can add new menu items', function () {
    let test = renderBlockMenu({ app, items: [{ id: 'test', label: 'Test' }] })
    expect(test).toHaveProperty('test')
  })

  it('calls the destroy action', function () {
    const test = renderBlockMenu({ app })
    const block = test.props.block

    userEvent.click(hack(DOM.findDOMNode(test.destroy)))

    expect(app.push).toHaveBeenCalledWith(Actions.destroy, block.id)
  })

  it('moves a block up when Move Before is clicked', function () {
    let block = app.state.blocks.concat().pop()
    let test = renderBlockMenu({ app, block })

    userEvent.click(hack(DOM.findDOMNode(test.moveBefore)))

    expect(app.push).toHaveBeenCalledWith(Actions.move, { block, distance: -1 })
  })

  it('disables Move Before if the block is the first child', function () {
    expect(renderBlockMenu({ app }).moveBefore.isDisabled()).toEqual(true)
  })

  it('moves a block down when Move After is clicked', function () {
    let block = app.state.blocks[0]
    let test = renderBlockMenu({ app, block })

    userEvent.click(hack(DOM.findDOMNode(test.moveAfter)))

    expect(app.push).toHaveBeenCalledWith(Actions.move, { block, distance: 1 })
  })

  it('disables Move After if the block is the first child', function () {
    let block = app.state.blocks.concat().pop()
    let test = renderBlockMenu({ app, block })

    expect(test.moveAfter.isDisabled()).toEqual(true)
  })
})
