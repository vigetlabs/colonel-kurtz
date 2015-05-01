let Dialog  = require('../../addons/dialog')
let Button  = require('../../src/components/Button')
let React   = require('react')
let Section = require('../../addons/section')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      content: {
        color: "#bbbbbb"
      }
    }
  },

  getInitialState() {
    return {
      openSettings: false
    }
  },

  getMenuItems() {
    return [{
      id      : 'settings',
      label   : 'Settings',
      onClick : this._onSettingsOpen
    }]
  },

  render() {
    let { color, openSettings } = this.state

    return (
      <div style={{ background: this.props.content.color }}>
        <Section { ...this.props } />
        <Dialog active={ openSettings } onExit={ this._onSettingsExit }>
          <h3 className="col-dialog-title">Settings!</h3>
          <p>
            You can use dialogs such as these to hide more settings
            and information.
          </p>
          <label>
            Color:
            <input type="color" onChange={ this._onColorChange } value={ color } />
          </label>
          <footer className="col-dialog-footer">
            <button className="col-button" onClick={ this._onSettingsExit }>
              Done
            </button>
          </footer>
        </Dialog>
      </div>
    )
  },

  _onColorChange(e) {
    this.props.onChange({ color: e.target.value })
  },

  _onSettingsOpen() {
    this.setState({ openSettings: true })
  },

  _onSettingsExit() {
    this.setState({ openSettings: false })
  }

})
