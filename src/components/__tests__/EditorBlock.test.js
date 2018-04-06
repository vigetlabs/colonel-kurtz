import React from 'react'
import Colonel from '../../Colonel'
import DOM from 'react-dom'
import EditorBlock from '../EditorBlock'
import config from './fixtures/colonelConfig'
import TestUtils from 'react-dom/test-utils'

const render = TestUtils.renderIntoDocument

describe('Components - EditorBlock', function() {
  let app

  beforeEach(function(done) {
    app = new Colonel(config)
    app.start(done)
  })

  it('renders child blocks', function() {
    let block = app.state.blocks[0]
    let component = render(<EditorBlock app={app} block={block} />)
    let element = DOM.findDOMNode(component)

    expect(element.children).toHaveLength(2)
  })
})
