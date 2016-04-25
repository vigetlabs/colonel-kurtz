/**
 * HTML Embed
 * A reuseable element for embedding HTML and associated JS.
 */

const Field   = require('../common/field')
const React   = require('react')
const toArray = list => Array.prototype.slice.call(list)

function sanitize (html) {
  let bucket = document.createElement('div')

  bucket.innerHTML = html

  let doNotAllow = toArray(bucket.querySelectorAll('script, style'))

  doNotAllow.forEach(el => el.parentNode.removeChild(el))

  return bucket.innerHTML
}

module.exports = React.createClass({

  getDefaultProps() {
    return {
      content: {
        html:   '',
        script: ''
      }
    }
  },

  shouldDisplaySandbox() {
    return this.props.content.html || this.props.content.script
  },

  getSandbox() {
    let { html = '', script = '' } = this.props.content

    let encoding   = "data:text/html;charset=utf-8,"
    let javascript = `<script src="${ script }" async></script>`
    let embeddable = encoding + escape(html + javascript)

    return <iframe className="col-block-frame" src={ embeddable } />
  },

  render() {
    let { html, script } = this.props.content

    return (
      <div>
        <Field className="col-block-html"
               label="HTML Embed"
               element="textarea"
               hint="Paste HTML into this field. Include related JavaScript below."
               ref="html"
               value={ html }
               onChange={ this.onHTMLChange } />

        <Field label="Embedded JavaScript URL"
               hint="Paste the JavaScript URL of the embed into this field."
               ref="script"
               value={ script }
               onChange={ this.onScriptChange } />

        { this.shouldDisplaySandbox() ? this.getSandbox() : null }
      </div>
    )
  },

  onScriptChange(event) {
    this.props.onChange({ script: event.target.value })
  },

  onHTMLChange(event) {
    this.props.onChange({ html: sanitize(event.target.value) })
  }

})
