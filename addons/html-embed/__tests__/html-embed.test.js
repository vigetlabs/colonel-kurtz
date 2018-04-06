const React = require('react')
const HtmlEmbed = require('../index')
const TestUtils = require('react-addons-test-utils')
const Simulate = TestUtils.Simulate
const render = TestUtils.renderIntoDocument

describe('Addons - HTML Embed', function() {
  context('instantiating the component', function() {
    beforeEach(function() {
      this.encoding = 'data:text/html;charset=utf-8'
    })

    context('when no HTML or script is provided', function() {
      beforeEach(function() {
        this.component = render(<HtmlEmbed />)
      })

      it('does not render the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          this.component,
          'iframe'
        )

        iframes.length.should.equal(0)
      })
    })

    context('when HTML is provided', function() {
      beforeEach(function() {
        this.content = { html: '<p>Arbitrary html</p>' }
        this.component = render(<HtmlEmbed content={this.content} />)
      })

      it('renders the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          this.component,
          'iframe'
        )

        iframes.length.should.equal(1)

        iframes[0].src.should.include(this.encoding)
        iframes[0].src.should.include(escape(this.content.html))
      })
    })

    context('when a script is provided', function() {
      beforeEach(function() {
        this.content = { script: 'https://scripts.net/such-wow' }
        this.component = render(<HtmlEmbed content={this.content} />)
        this.expectedScript = escape(
          '<script src="https://scripts.net/such-wow" async></script>'
        )
      })

      it('renders the sandbox', function() {
        const iframes = TestUtils.scryRenderedDOMComponentsWithTag(
          this.component,
          'iframe'
        )

        iframes.length.should.equal(1)

        iframes[0].src.should.include(this.encoding)
        iframes[0].src.should.include(this.expectedScript)
      })
    })
  })

  context('on an existing component', function() {
    context('when given HTML', function() {
      context(
        'containing potentially dangerous tags (script/style)',
        function() {
          it('sanitizes HTML when the user inputs markup', function(done) {
            function didStripStyleTags(content) {
              content.html.should.not.include('<style')
              content.html.should.not.include('<script')
              done()
            }

            var component = render(<HtmlEmbed onChange={didStripStyleTags} />)
            var content =
              '<style>body{}</style><p>Test</p><script src="https://such-script.com/wow"></script>'

            Simulate.change(component.html.input, {
              target: { value: content }
            })
          })
        }
      )
    })
  })
})
