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
      <div>
        <Section { ...this.props } />
        <Dialog active={ openSettings } onExit={ this._onSettingsExit }>
          <h3 className="col-dialog-title">Hey!</h3>
        </Dialog>
      </div>
    )
  },

  _onSettingsExit() {
    this.setState({ openSettings: false })
  }

})
