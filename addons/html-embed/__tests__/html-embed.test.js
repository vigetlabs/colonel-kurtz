import React from 'react'
import HtmlEmbed from '../index'
import TestUtils from 'react-dom/test-utils'

const Simulate = TestUtils.Simulate
const render = TestUtils.renderIntoDocument

describe('Addons - HTML Embed', function() {
  const encoding = 'data:text/html;charset=utf-8'

  describe('instantiating the component', function() {
    describe('when no HTML or script is provided', function() {
      let component = null

      beforeEach(function() {
        component = render(<HtmlEmbed />)
      })

      it('does not render the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          component,
          'iframe'
        )

        expect(iframes.length).toEqual(0)
      })
    })

    describe('when HTML is provided', function() {
      let content = null
      let component = null

      beforeEach(function() {
        content = { html: '<p>Arbitrary html</p>' }
        component = render(<HtmlEmbed content={content} />)
      })

      it('renders the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          component,
          'iframe'
        )

        expect(iframes.length).toEqual(1)

        expect(iframes[0].src).toContain(encoding)
        expect(iframes[0].src).toContain(escape(content.html))
      })
    })

    describe('when a script is provided', function() {
      let content = null
      let component = null
      let expectedScript = escape(
        '<script src="https://scripts.net/such-wow" async></script>'
      )

      beforeEach(function() {
        content = { script: 'https://scripts.net/such-wow' }
        component = render(<HtmlEmbed content={content} />)
      })

      it('renders the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          component,
          'iframe'
        )

        expect(iframes.length).toEqual(1)
        expect(iframes[0].src).toContain(encoding)
        expect(iframes[0].src).toContain(expectedScript)
      })
    })
  })

  describe('on an existing component', function() {
    describe('when given HTML', function() {
      describe('containing potentially dangerous tags (script/style)', function() {
        it('sanitizes HTML when the user inputs markup', function(done) {
          function didStripStyleTags(content) {
            expect(content.html).not.toContain('<style')
            expect(content.html).not.toContain('<script')
            done()
          }

          var component = render(<HtmlEmbed onChange={didStripStyleTags} />)
          var content =
            '<style>body{}</style><p>Test</p><script src="https://such-script.com/wow"></script>'

          Simulate.change(component.html.input, {
            target: { value: content }
          })
        })
      })
    })
  })
})
