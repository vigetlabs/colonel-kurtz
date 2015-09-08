let BlockTypeGroup = require('./BlockTypeGroup')
let Btn            = require('./Button')
let React          = require('react')
let groupBy        = require('group-by')

module.exports = React.createClass({

  propTypes: {
    blockTypes : React.PropTypes.array.isRequired,
    onAdd      : React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.getDOMNode().focus()
  },

  getButton(type) {
    let { id, label } = type
    let { onAdd } = this.props

    return {
      name: label,
      component: (<Btn key={ id } className="col-switch-btn" onClick={ () => onAdd(type) }>{ label }</Btn>)
    }
  },

  getGroups(blocks) {
    let groups = groupBy(blocks.filter(b => b.group), type => type.group)
    let items = []

    for (var name in groups) {
      items.push({
        name,
        component: (<BlockTypeGroup key={ name } items={ groups[name] } label={ name } onAdd={ this.props.onAdd } />)
      })
    }

    return items
  },

  render() {
    let ungrouped = this.props.blockTypes.filter(b => !b.group).map(this.getButton)
    let grouped   = this.getGroups(this.props.blockTypes)
      console.log(ungrouped, grouped)
    let sorted    = grouped.concat(ungrouped).sort(function(a, b) {
      return a.name > b.name ? 1 : -1
    })

    return (
      <nav className="col-switch-nav" role="navigation">
        { sorted.map(s => s.component) }
      </nav>
    )
  }
})
