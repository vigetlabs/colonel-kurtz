/**
 * HTML Embed
 * A reuseable element for embedding HTML and associated JS.
 */

import React from 'react'
import Field from '../common/field'
import { sanitize } from './sanitize'

const defaultProps = {
  content: {
    html: '',
    script: ''
  },
  safe: true
}

export default class HtmlEmbedBlock extends React.Component {
  shouldDisplaySandbox() {
    return this.props.content.html || this.props.content.script
  }

  getSandbox() {
    let { html = '', script = '' } = this.props.content

    let encoding = 'data:text/html;charset=utf-8,'
    let style = '<style>body { margin: 0 }</style>'
    let javascript = `<script src="${script}" async></script>`
    let embeddable = encoding + escape(style + html + javascript)

    return <iframe className="col-block-html-frame" src={embeddable} />
  }

  render() {
    let { html, script } = this.props.content

    return (
      <div>
        <Field
          className="col-block-html"
          label="HTML Embed"
          element="textarea"
          hint="Paste HTML into this field. Include related JavaScript below."
          ref={el => (this.html = el)}
          value={html}
          onChange={this.onHTMLChange.bind(this)}
        />

        <Field
          label="Embedded JavaScript URL"
          hint="Paste the JavaScript URL of the embed into this field."
          ref={el => (this.script = el)}
          value={script}
          onChange={this.onScriptChange.bind(this)}
        />

        {this.shouldDisplaySandbox() ? this.getSandbox() : null}
      </div>
    )
  }

  onScriptChange(event) {
    this.props.onChange({ script: event.target.value })
  }

  onHTMLChange(event) {
    let html = event.target.value

    if (this.props.safe) {
      html = sanitize(html)
    }

    this.props.onChange({ html })
  }
}

HtmlEmbedBlock.defaultProps = defaultProps
