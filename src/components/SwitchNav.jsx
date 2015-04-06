import Actions from 'actions/blocks'
import Btn     from './Button'
import React   from 'react'

export default React.createClass({

  propTypes: {
    app        : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.array.isRequired
  },

  getButton({ id, label }) {
    return (
      <Btn key={ id } className="col-switch-btn" onClick={ () => this._onAdd(id) }>
        { label }
      </Btn>
    )
  },

  render() {
    let { app, blockTypes, hide } = this.props

    return hide ? null : (
      <nav className="col-switch-nav" role="navigation">
        { blockTypes.map(this.getButton)}
      </nav>
    )
  },

  _onAdd(id) {
    let { app, position, parent } = this.props
    app.push(Actions.create, id, position, parent)
  }
})
