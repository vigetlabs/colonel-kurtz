/**
 * This component adds a medium.com-like rich text editor block type.
 *
 * Source for this component can be found here:
 * https://github.com/daviferreira/medium-editor
 */

import React from 'react'
import MediumEditor from './vendor/medium-editor'

const defaultProps = {
  content: { html: '', text: '' },
  options: {
    buttons: [
      'header1',
      'header2',
      'bold',
      'italic',
      'underline',
      'anchor',
      'quote',
      'unorderedlist',
      'orderedlist'
    ],
    firstHeader: 'h1',
    secondHeader: 'h2',
    diffLeft: 0,
    diffTop: -10,
    disableDoubleReturn: true
  }
}

export default class MediumBlock extends React.Component {
  shouldComponentUpdate(props, state) {
    return false
  }

  componentDidMount() {
    this.editor = new MediumEditor(this.container, this.props.options)
  }

  componentWillUnmount() {
    this.editor.deactivate()
  }

  render() {
    return (
      <div className="col-block-medium">
        <div
          className="col-medium"
          onBlur={this._onBlur.bind(this)}
          role="textarea"
          aria-multiline="true"
          ref={el => (this.container = el)}
          dangerouslySetInnerHTML={{ __html: this.props.content.html }}
        />
        {this.props.children}
      </div>
    )
  }

  _onBlur() {
    this.props.onChange({
      text: this.container.textContent,
      html: this.container.innerHTML
    })
  }
}

MediumBlock.defaultProps = defaultProps
