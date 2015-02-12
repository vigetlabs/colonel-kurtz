/* @flow */

var Button       = require('components/ui/button');
var React        = require('react')
var Types        = React.PropTypes
var UpdateEditor = require('actions/editor/update')
var modes        = require('constants/mode_constants')
var Pure         = require('../mixins/pure')

var ModeSelection = React.createClass({
  mixins: [ Pure ],

  propType: {
    editor : Types.object.isRequired,
    modes  : Types.object
  },

  getDefaultProps(): Object {
    return { modes }
  },

  getTab(key:string): any {
    var { editor, modes } = this.props

    var props = {
      className : "col-tabs-btn",
      disabled  : editor.mode === modes[key],
      onClick   : e => this._onModeClick(e, modes[key])
    }

    return (
      <li key={ key } className="col-tabs-list-item" role="tab">
        <Button { ...props }>{ key.replace('_', ' ') }</Button>
      </li>
    )
  },

  getTabs(): any {
    return Object.keys(this.props.modes).map(this.getTab);
  },

  render(): any {
    return this.props.editor.preview ? (
      <nav role="navigation" className="col-tabs">
        <ul className="col-tabs-list" role="tablist">
          { this.getTabs() }
        </ul>
      </nav>
    ) : null
  },

  _onModeClick(e: Event, mode: string): void {
    e.preventDefault()
    UpdateEditor(this.props.editor.id, { mode })
  }

})

module.exports = ModeSelection
