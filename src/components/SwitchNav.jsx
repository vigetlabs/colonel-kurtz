let BlockTypeGroup = require('./BlockTypeGroup')
let Btn            = require('./Button')
let React          = require('react')
let DOM            = require('react-dom')
let groupBy        = require('group-by')

module.exports = React.createClass({

  propTypes: {
    blockTypes : React.PropTypes.array.isRequired,
    onAdd      : React.PropTypes.func.isRequired
  },

  componentDidMount() {
    DOM.findDOMNode(this).focus()
  },

  getButton(type) {
    let { id, label } = type
    let { onAdd } = this.props

    return {
      name: label,
      type: type,
      component: (<Btn key={ id } className="col-switch-btn" onClick={ () => onAdd(type) }>{ label }</Btn>)
    }
  },

  getGroups(blocks) {
    let groups = groupBy(blocks.filter(b => b.group), type => type.group)
    let items = []

    for (var name in groups) {
      items.push({
        name,
        type: groups[name][0],
        component: (<BlockTypeGroup key={ name } items={ groups[name] } label={ name } onAdd={ this.props.onAdd } />)
      })
    }

    return items
  },

  render() {
    let { blockTypes } = this.props

    let ungrouped = blockTypes.filter(b => !b.group).map(this.getButton)
    let grouped   = this.getGroups(blockTypes)
    let sorted    = grouped.concat(ungrouped).sort(function (a, b) {
      return blockTypes.indexOf(a.type) - blockTypes.indexOf(b.type)
    })

    return (
      <nav className="col-switch-nav" role="navigation">
        { sorted.map(s => s.component) }
      </nav>
    )
  }
})
