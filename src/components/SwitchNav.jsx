let Btn   = require('./Button')
let React = require('react')

module.exports = React.createClass({

  propTypes: {
    blockTypes : React.PropTypes.array.isRequired,
    onAdd      : React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.getDOMNode().focus()
  },

  getButton({ id, label }) {
    let { onAdd } = this.props

    return (
      <Btn key={ id } className="col-switch-btn" onClick={ () => onAdd(id) }>
        { label }
      </Btn>
    )
  },

  render() {
    return (
      <nav className="col-switch-nav" role="navigation">
        { this.props.blockTypes.map(this.getButton)}
      </nav>
    )
  }
})
