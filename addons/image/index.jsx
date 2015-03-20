/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import Field   from '../common/field'
import Graphic from './graphic'
import React   from 'react'

require('./style')

var Image = React.createClass({

  propTypes: {
    content  : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      content: { src: '' }
    }
  },

  render() {
    var { src } = this.props.content

    return (
      <div className="col-img">
        <Graphic { ...this.props.content } />

        <fieldset className="col-img-fieldset">
          <Field label="Image Source" type="url" value={ src } name="image_src" onChange={ this._onSrcChange }/>
        </fieldset>
      </div>
    )
  },

  _onSrcChange(e) {
    this.props.onChange({ src: e.currentTarget.value })
  },

  _onCaptionChange(e) {
    this.props.onChange({ caption: e.currentTarget.value })
  },

  _onAttributionChange(e) {
    this.props.onChange({ attribution: e.currentTarget.value })
  }

})

export default Image
