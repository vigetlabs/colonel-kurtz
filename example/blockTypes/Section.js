import React from 'react'
import Dialog from '../../addons/dialog'
import Section from '../../addons/section'

export default class ExampleSection extends React.Component {
  static defaultProps = {
    content: {
      color: '#bbbbbb'
    }
  }

  state = {
    openSettings: false
  }

  getMenuItems() {
    return [
      {
        id: 'settings',
        label: 'Settings',
        onClick: this._onSettingsOpen.bind(this)
      }
    ]
  }

  render() {
    return (
      <div style={{ background: this.props.content.color }}>
        <Section {...this.props} />
        <Dialog
          title="Settings"
          headingComponent="h1"
          active={this.state.openSettings}
          onExit={this._onSettingsExit.bind(this)}
        >
          <p>
            You can use dialogs such as these to hide more settings and
            information.
          </p>
          <label>
            Color:
            <input
              type="color"
              onChange={this._onColorChange.bind(this)}
              value={this.props.content.color}
            />
          </label>
          <footer className="col-dialog-footer">
            <button
              className="col-button"
              onClick={this._onSettingsExit.bind(this)}
            >
              Done
            </button>
          </footer>
        </Dialog>
      </div>
    )
  }

  _onColorChange(e) {
    this.props.onChange({ color: e.target.value })
  }

  _onSettingsOpen() {
    this.setState({ openSettings: true })
  }

  _onSettingsExit() {
    this.setState({ openSettings: false })
  }
}
