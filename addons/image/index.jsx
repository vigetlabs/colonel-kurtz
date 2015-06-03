/**
 * Image Colonel Kurtz Addon
 * This component adds a basic image block type, including a
 * src, caption, and credit
 */

let Field   = require('../common/field')
let Graphic = require('../common/graphic')
let Frame   = require('../common/frame')
let React   = require('react')

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
        { this.props.children }
        <Frame open={ `${ src }`.trim() }>
          <Graphic src={ src } alt="" />
        </Frame>
      </div>
    )
  },

  _onSrcChange(e) {
    this.props.onChange({
      src: e.currentTarget.value
    })
  }

})

module.exports = Image
