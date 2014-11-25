/* @flow */

var React = require('react')
var AppConstants = require('../constants/app_constants')

var ModeSelection = React.createClass({

  propType: {
    mode    : React.PropTypes.oneOf(AppConstants),
    modes   : React.PropTypes.object,
    setMode : React.PropTypes.func
  },

  getDefaultProps(): Object {
    return {
      mode: AppConstants.EDIT_MODE,
      modes: {
        'Edit'    : AppConstants.EDIT_MODE,
        'Preview' : AppConstants.PREVIEW_MODE,
        'JSON'    : AppConstants.JSON_CONSOLE_MODE
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
        <button className="colonel-tabs-btn" { ...props }>
          { key }
        </button>
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
