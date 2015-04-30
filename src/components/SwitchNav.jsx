let Actions = require('../actions/blocks')
let Btn     = require('./Button')
let React   = require('react')

module.exports = React.createClass({

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
    let { blockTypes, hide } = this.props

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
