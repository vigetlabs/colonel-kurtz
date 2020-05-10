import React from 'react'
import Colonel from '../../Colonel'
import DOM from 'react-dom'
import Fixture from './fixtures/testBlockType'
import Switch from '../Switch'
import TestUtils from 'react-dom/test-utils'

describe('Components - Switch', function () {
  let render = TestUtils.renderIntoDocument
  let app

  beforeEach(function () {
    app = new Colonel({
      el: document.createElement('div'),
      blockTypes: [Fixture]
    })
  })

  it('closes when it adds a block', function () {
    let base = render(<Switch app={app} />)

    base.setState({ open: true })

    TestUtils.Simulate.click(
      DOM.findDOMNode(base).querySelector('.col-switch-btn')
    )

    expect(base).toHaveProperty('state.open', false)
  })

  it('adds a block type on click', function () {
    let base = render(<Switch app={app} />)

    base.setState({ open: true })

    TestUtils.Simulate.click(
      DOM.findDOMNode(base).querySelector('.col-switch-btn')
    )

    expect(app.state.blocks[0]).toHaveProperty('type', 'test')
  })

  describe('When only one block type given', function () {
    it('_onToggle creates that block type', function () {
      let component = render(<Switch app={app} />)

      component._onToggle()

      expect(app.state.blocks[0]).toHaveProperty('type', 'test')
    })
  })

  describe('When more than one block type is given', function () {
    beforeEach(function () {
      let SecondType = Object.create(Fixture)

      SecondType.id = 'another'

      app = new Colonel({
        el: document.createElement('div'),
        blockTypes: [Fixture, SecondType]
      })
    })

    it('_onToggle sets the state to open', function () {
      let component = render(<Switch app={app} />)

      component._onToggle()

      expect(component).toHaveProperty('state.open', true)
    })
  })

  describe('When given a block with a parent', function () {
    beforeEach(function () {
      let SecondType = Object.create(Fixture)

      SecondType.id = 'another'
      SecondType.types = [Fixture.id]

      app = new Colonel({
        el: document.createElement('div'),
        blockTypes: [Fixture, SecondType],
        value: [{ type: SecondType.id, content: {}, blocks: [] }]
      })
    })

    it('getTypes should display multiple blocks', function () {
      let component = render(<Switch app={app} parent={app.state.blocks[0]} />)

      component.setState({ open: true })

      let buttons = DOM.findDOMNode(component).querySelectorAll('button')

      expect(buttons.length).toBeGreaterThan(1)
    })
  })

  describe('When given a block with a parent that has no types', function () {
    beforeEach(function () {
      app = new Colonel({
        el: document.createElement('div'),
        blocks: [{ type: Fixture.id, content: {}, blocks: [] }],
        blockTypes: [Fixture]
      })
    })

    it('renders nothing', function () {
      let component = render(<Switch app={app} parent={app.state.blocks[0]} />)
      expect(DOM.findDOMNode(component)).toEqual(null)
    })
  })

  describe('Key presses', function () {
    it('closes when the escape key is presed', function () {
      let base = render(<Switch app={app} />)

      base.setState({ open: true })

      TestUtils.Simulate.keyUp(DOM.findDOMNode(base.nav), { key: 'Escape' })

      expect(base).toHaveProperty('state.open', false)
    })

    it('does not close when another key is presed', function () {
      let base = render(<Switch app={app} />)

      base.setState({ open: true })

      TestUtils.Simulate.keyUp(DOM.findDOMNode(base.nav), { key: 'q' })

      expect(base).toHaveProperty('state.open', true)
    })
  })

  describe('Creating block children', function () {
    let LimitedFixture = Object.assign({}, Fixture, {
      id: 'limited',
      maxChildren: 3,
      types: ['limited']
    })

    beforeEach(function () {
      let type = LimitedFixture.id
      let content = {}
      let block = { type, content, blocks: [] }

      app = new Colonel({
        el: document.createElement('div'),
        blocks: [
          {
            type,
            content,
            blocks: [block, block, block]
          }
        ],
        blockTypes: [LimitedFixture]
      })
    })

    it('does not enable toggles when its provided block has too many children', function () {
      let el = render(<Switch app={app} parent={app.state.blocks[0]} />)
      let button = DOM.findDOMNode(el).querySelector('button')

      expect(button).toHaveProperty('disabled', true)
    })
  })

  describe('With nested blocks', function () {
    beforeEach(function () {
      let NestedFixture = { ...Fixture, types: [Fixture.id] }

      let bottom = { type: NestedFixture.id, content: {}, blocks: [] }
      let middle = { type: NestedFixture.id, content: {}, blocks: [bottom] }
      let root = { type: NestedFixture.id, content: {}, blocks: [middle] }

      app = new Colonel({
        el: document.createElement('div'),
        maxDepth: 4,
        blocks: [root],
        blockTypes: [NestedFixture]
      })
    })

    it('does not display the switch if the nesting is too deep', function () {
      let child = app.state.blocks[2]
      let parent = app.state.blocks[1]
      let el = render(<Switch app={app} parent={parent} position={child} />)

      expect(DOM.findDOMNode(el).className).not.toContain('col-switch-disabled')
    })
  })

  describe('With nested blocks too deep', function () {
    beforeEach(function () {
      let NestedFixture = { ...Fixture, types: [Fixture.id] }

      let bottom = { type: NestedFixture.id, content: {}, blocks: [] }
      let middle = { type: NestedFixture.id, content: {}, blocks: [bottom] }
      let root = { type: NestedFixture.id, content: {}, blocks: [middle] }

      app = new Colonel({
        el: document.createElement('div'),
        maxDepth: 3,
        blocks: [root],
        blockTypes: [NestedFixture]
      })
    })

    it('does not display the switch if the nesting is too deep', function () {
      let child = app.state.blocks[2]
      let parent = app.state.blocks[1]
      let el = render(<Switch app={app} parent={parent} position={child} />)

      expect(DOM.findDOMNode(el).className).toContain('col-switch-disabled')
    })
  })

  describe('Creating editor children', function () {
    beforeEach(function () {
      let block = { type: Fixture.id, content: {}, blocks: [] }

      app = new Colonel({
        el: document.createElement('div'),
        maxChildren: 3,
        blocks: [block, block, block],
        blockTypes: [Fixture]
      })
    })

    it('does not enable toggles when the apps maxChildren setting is exceeded', function () {
      let el = render(<Switch app={app} />)
      let button = DOM.findDOMNode(el).querySelector('button')

      expect(button).toHaveProperty('disabled', true)
    })
  })
})
