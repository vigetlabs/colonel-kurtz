import React from 'react'
import DOM from 'react-dom'
import Colonel from '../../Colonel'
import Item from '../MenuItem'
import config from './fixtures/colonelConfig'
import TestUtils from 'react-dom/test-utils'
import { Menu, MenuButton, MenuList } from '@reach/menu-button'

const render = TestUtils.renderIntoDocument

/**
 * React UI's `MenuItem` must be rendered inside a `<Menu>` with a `<MenuButton>`.
 */
function renderMenuItem(props) {
  const ref = React.createRef()

  render(
    <Menu>
      <MenuButton>Menu</MenuButton>
      <MenuList>
        <Item ref={ref} {...props} />
      </MenuList>
    </Menu>
  )

  return ref.current
}

describe('Components - Menu Item', function () {
  let app

  beforeEach(function () {
    app = new Colonel(config)
  })

  it('has a default noop onClick prop', function () {
    const block = app.state.blocks[0]

    const item = renderMenuItem({
      app,
      block,
      id: 'id',
      label: 'test'
    })

    item.props.onClick()
  })

  it('has a default noop isDisabled prop', function () {
    const block = app.state.blocks[0]

    const item = renderMenuItem({
      app,
      block,
      id: 'id',
      label: 'test'
    })

    expect(item.props.isDisabled()).not.toBeDefined()
  })

  it('allows label to be a function', function () {
    const block = app.state.blocks[0]
    const labelFn = function () {
      return 'my-label'
    }

    const item = renderMenuItem({
      app,
      block,
      id: 'id',
      label: labelFn
    })

    const result = DOM.findDOMNode(item)

    expect(result.textContent).toEqual('my-label')
  })

  it('sends the item component into the onClick callback', function (done) {
    function testClick(app, block, component) {
      expect(component).toEqual(item)
      done()
    }

    const block = app.state.blocks[0]

    const item = renderMenuItem({
      app,
      block,
      id: 'id',
      label: 'test',
      onClick: testClick
    })

    item._onClick()
  })
})
