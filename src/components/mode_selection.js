/* @flow */

var React  = require('react')
var Button = require('./ui/button');
var Modes  = require('../constants/mode_constants')

var ModeSelection = React.createClass({

  propType: {
    mode     : React.PropTypes.oneOf(Object.keys(Modes)),
    modes    : React.PropTypes.object,
    onChange : React.PropTypes.func.isRequired
  },

  getDefaultProps(): Object {
    return {
      mode: Modes.EDIT_MODE,
      modes: {
        'Edit'    : Modes.EDIT_MODE,
        'Preview' : Modes.PREVIEW_MODE
      }
    }
  },

  getTab(key:string): any {
    var { mode, modes, setMode } = this.props

    var props = {
      className : "col-tabs-btn",
      disabled  : mode === modes[key],
      onClick   : e => this._onModeClick(e, modes[key])
    }

    return (
      <li key={ key } className="col-tabs-list-item" role="tab">
        <Button { ...props }>{ key }</Button>
      </li>
    )
  },

  getTabs(): any {
    return Object.keys(this.props.modes).map(this.getTab);
  },

  render(): any {
    return (
      <nav role="navigation" className="col-tabs">
        <ul className="col-tabs-list" role="tablist">
          { this.getTabs() }
        </ul>
      </nav>
    )
  },

  _onModeClick(e: Event, mode: string): void {
    e.preventDefault()

    this.props.onChange(mode)
  }

})

module.exports = ModeSelection
