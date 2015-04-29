import Dialog  from '../../addons/dialog'
import React   from 'react'
import Section from '../../addons/section'

export default React.createClass({

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
      openSettings: true
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
