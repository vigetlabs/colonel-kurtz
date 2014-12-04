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
    var { video_id } = this.props

    return (
      <div className="col-youtube">
        <Player video_id={ video_id } />

        <fieldset className="col-youtube-fieldset">
          <Field label="YouTube Video ID" value={ video_id } name="youtube_video_id" onChange={ this._onChange }/>
        </fieldset>
      </div>
    )
  },

  _onChange(e) {
    this.props.onChange({ video_id: e.currentTarget.value })
  }

})

module.exports = Editor
