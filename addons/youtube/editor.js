var Field   = require('../common/field')
var Player  = require('./player')
var React   = require('react')
var Types   = React.PropTypes

var Editor = React.createClass({

  propTypes: {
    src      : Types.string,
    onChange : Types.func.isRequired
  },

  render() {
    var { src } = this.props

    return (
      <div className="col-youtube">
        <Player src={ src } />

        <fieldset className="col-youtube-fieldset">
          <Field label="YouTube Video ID" value={ src } name="image_src" onChange={ this._onSrcChange }/>
        </fieldset>
      </div>
    )
  },

  _onSrcChange(e) {
    this.props.onChange({ src: e.currentTarget.value })
  }

})

module.exports = Editor
