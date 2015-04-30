let Dialog  = require('../../addons/dialog')
let React   = require('react')
let Section = require('../../addons/section')

module.exports = React.createClass({

  statics: {
    menu: [{
      id    : 'settings',
      label : 'Settings'
    }]
  },

  getDefaultProps() {
    return {
      content: {
        color: "#eeeeee"
      }
    }
  },

  getInitialState() {
    return {
      openSettings: false
    }
  },

  menuWillSelect(item) {
    switch (item) {
      case 'settings':
        this.setState({ openSettings: true })
        break
    }
  },

  render() {
    let { openSettings } = this.state

    return (
      <div style={{ background: this.props.content.color }}>
        <Section { ...this.props } />
        <Dialog active={ openSettings } onExit={ this._onSettingsExit }>
          <h3 className="col-dialog-title">Settings!</h3>
          <label>
            Color:
            <input type="color" onChange={ this._onColorChange } value={ this.state.color } />
          </label>
        </Dialog>
      </div>
    )
  },

  _onColorChange(e) {
    this.props.onChange({ color: e.target.value })
  },

  _onSettingsExit() {
    this.setState({ openSettings: false })
  }

})
