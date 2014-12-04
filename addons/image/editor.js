var Field   = require('../common/field')
var Graphic = require('./graphic')
var React   = require('react')
var Types   = React.PropTypes

var Editor = React.createClass({

  propTypes: {
    src      : Types.string,
    caption  : Types.string,
    credit   : Types.string,
    onChange : Types.func.isRequired
  },

  render() {
    var { src, caption, credit } = this.props

    return (
      <div className="col-img">
        <Graphic src={ src } caption={ caption } credit={ credit } />

        <fieldset className="col-img-fieldset">
          <Field label="Source" type="url" value={ src } name="image_src" onChange={ this._onSrcChange }/>
          <Field label="Caption" type="text" value={ caption } name="image_caption" onChange={ this._onCaptionChange } />
          <Field label="Credit" type="text" value={ credit } name="image_credit" onChange={ this._onCreditChange } />
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

  _onCreditChange(e) {
    this.props.onChange({ credit: e.currentTarget.value })
  }

})

module.exports = Editor
