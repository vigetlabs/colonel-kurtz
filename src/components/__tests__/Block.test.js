let Block = require('../Block')
import React from 'react'
let Colonel = require('../../Colonel')
let DOM = require('react-dom')
let config = require('./fixtures/colonelConfig')
let TestUtils = require('react-addons-test-utils')
let render = TestUtils.renderIntoDocument

describe('Components - Block', function() {
  let app, component

  beforeEach(function(done) {
    app = new Colonel(config)

    app.start(function() {
      sinon.spy(app, 'push')
      component = render(<Block app={app} block={app.state.blocks[0]} />)
      done()
    })
  })

  it('assigns default content to the block', function() {
    let block = component.props.block

    block.content.text.should.equal('Test')
  })

  it('adds a class name according to the block id', function() {
    let block = component.props.block
    let element = DOM.findDOMNode(component)
    let child = element.querySelector('.col-block')

    child.className.should.include(block.type)
  })

  it('sends an onOpen callback to the menu it owns', function() {
    component.menu.props.onOpen()
    component.state.should.have.property('menuOpen', true)
  })

  it('updates a block when it changes', function() {
    component._onChange({ fiz: 'buzz' })
    component.props.block.content.should.have.property('fiz', 'buzz')
  })

  it('passes menu items from the block type component to the menu', function() {
    let { menu } = component
    component.setState({ menuOpen: true })
    menu.should.have.property('test')
  })

  it('can close a menu', function() {
    let { menu } = component
    component.setState({ menuOpen: true })
    menu.props.onExit()
    component.state.menuOpen.should.equal(false)
  })

  it('respects default the content prop', function() {
    let { block } = component

    expect(block.props.content.text).to.equal('Test')
  })
})
