var Field   = require('../common/field')
var Graphic = require('./graphic')
var React   = require('react')
var Types   = React.PropTypes

var Editor = React.createClass({

  propTypes: {
    src         : Types.string,
    caption     : Types.string,
    attribution : Types.string,
    onChange    : Types.func.isRequired
  },

  render() {
    var { src, caption, attribution } = this.props

    return (
      <div className="col-img">
        <Graphic { ...this.props } />

        <fieldset className="col-img-fieldset">
          <Field label="Image Source" type="url" value={ src } name="image_src" onChange={ this._onSrcChange }/>
          <Field label="Caption" type="text" value={ caption } name="image_caption" onChange={ this._onCaptionChange } />
          <Field label="Attribution" type="text" value={ attribution } name="image_attribution" onChange={ this._onAttributionChange } />
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

module.exports = Editor
