/* @flow */

var React  = require('react')
var Button = require('./ui/button');
var Modes  = require('../constants/mode_constants')

var ModeSelection = React.createClass({

  propType: {
    mode    : React.PropTypes.oneOf(Object.keys(Modes)),
    modes   : React.PropTypes.object,
    setMode : React.PropTypes.func
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

  getTab(key): any {
    var { mode, modes, setMode } = this.props

    var props = {
      onClick: setMode(modes[key]),
      disabled: mode === modes[key]
    }

    return (
      <li key={ key } className="colonel-tabs-list-item" role="tab">
        <Button className="colonel-tabs-btn" { ...props }>
          { key }
        </Button>
      </li>
    )
  },

  getTabs(): any {
    return Object.keys(this.props.modes).map(this.getTab);
  },

  render(): any {
    return (
      <nav role="navigation" className="colonel-tabs">
        <ul className="colonel-tabs-list" role="tablist">
          { this.getTabs() }
        </ul>
      </nav>
    )
  }

})

module.exports = ModeSelection
