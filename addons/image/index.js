/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

import React from 'react'
import Field from '../common/field'
import Frame from '../common/frame'
import Graphic from '../common/graphic'

class ImageBlock extends React.Component {
  static defaultProps = {
    content: { src: '' }
  }

  render() {
    var { src } = this.props.content

    return (
      <div className="col-img">
        <Field
          label="Image Source"
          type="url"
          value={src}
          name="image_src"
          onChange={this._onSrcChange.bind(this)}
        />
        {this.props.children}
        <Frame open={`${src || ''}`.trim()}>
          <Graphic src={src} alt="" />
        </Frame>
      </div>
    )
  }

  _onSrcChange(e) {
    this.props.onChange({
      src: e.currentTarget.value
    })
  }
}

export default ImageBlock
