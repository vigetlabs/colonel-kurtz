import React from 'react'
import Colonel from '../../Colonel'
import DOM from 'react-dom'
import BlockMenu from '../BlockMenu'
import Actions from '../../actions/blocks'
import config from './fixtures/colonelConfig'
import TestUtils from 'react-dom/test-utils'

const render = TestUtils.renderIntoDocument

describe('Components - BlockMenu', function () {
  let app, menu

  beforeEach(function () {
    app = new Colonel(config)

    jest.spyOn(app, 'push')

    menu = React.createElement(BlockMenu, {
      app: app,
      block: app.state.blocks[0],
      onOpen: jest.fn(),
      onExit: jest.fn(),
      active: true
    })
  })

  it('calls the onOpen property when the handle is clicked', function () {
    let test = render(menu)
    TestUtils.Simulate.click(DOM.findDOMNode(test.handle))
    expect(menu.props.onOpen).toHaveBeenCalled()
  })

  it('can add new menu items', function () {
    let test = render(
      React.cloneElement(menu, { items: [{ id: 'test', label: 'Test' }] })
    )
    expect(test).toHaveProperty('test')
  })

  it('calls the destroy action', function () {
    let test = render(menu)
    let block = test.props.block

    TestUtils.Simulate.click(DOM.findDOMNode(test.destroy))

    expect(app.push).toHaveBeenCalledWith(Actions.destroy, block.id)
  })

  it('moves a block up when Move Before is clicked', function () {
    let block = app.state.blocks.concat().pop()
    let test = render(React.cloneElement(menu, { block }))

    TestUtils.Simulate.click(DOM.findDOMNode(test.moveBefore))

    expect(app.push).toHaveBeenCalledWith(Actions.move, { block, distance: -1 })
  })

  it('disables Move Before if the block is the first child', function () {
    expect(render(menu).moveBefore.isDisabled()).toEqual(true)
  })

  it('moves a block down when Move After is clicked', function () {
    let block = app.state.blocks[0]
    let test = render(React.cloneElement(menu, { block }))

    TestUtils.Simulate.click(DOM.findDOMNode(test.moveAfter))

    expect(app.push).toHaveBeenCalledWith(Actions.move, { block, distance: 1 })
  })

  it('disables Move After if the block is the first child', function () {
    let block = app.state.blocks.concat().pop()
    let test = render(React.cloneElement(menu, { block }))

    expect(test.moveAfter.isDisabled()).toEqual(true)
  })
})
