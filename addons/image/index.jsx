/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import Field   from '../common/field'
import Graphic from '../common/graphic'
import Frame   from '../common/frame'
import React   from 'react'

var Image = React.createClass({

  getDefaultProps() {
    return {
      content: { src: '' }
    }
  },

  render() {
    var { src } = this.props.content

    return (
      <div className="col-img">
        <Field label="Image Source" type="url" value={ src } name="image_src" onChange={ this._onSrcChange }/>
        <Frame open={ src }>
          <Graphic src={ src } alt="" />
        </Frame>
      </div>
    )
  },

  _onSrcChange(e) {
    this.props.onChange({ src: e.currentTarget.value })
  }

})

export default Image
