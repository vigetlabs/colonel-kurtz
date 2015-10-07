let React               = require('react')
let Switch              = require('./Switch')
let classNames          = require('classnames')
let InsertionController = require('../utils/insertionController')
let dragAndDropUtils    = require('../utils/dragAndDrop')

var DropTarget = require('react-dnd').DropTarget;

var InsertionPoint = React.createClass({

  propTypes: {
    app : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      hovered: false,
      insertAllowed: false,
      insertDisallowed: false,
      dropMessage: null
    }
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      const insertController = new InsertionController(this.props)
      const [insertAllowed, dropMessage] = insertController.insertAllowed(this.props.block)

      this.setState({
        hovered: true,
        insertAllowed: insertAllowed,
        insertDisallowed: !insertAllowed,
        dropMessage: dropMessage
      })
    }

    if (this.props.isOver && !nextProps.isOver) {
      this.setState(this.getInitialState())
    }
  },

  render() {
    const { app, containingBlock, connectDropTarget, preceedingBlock } = this.props

    const className = classNames('col-insertion-point', {
      'col-insertion-point-hover': this.state.hovered,
      'col-insertion-point-insert-allowed': this.state.insertAllowed,
      'col-insertion-point-insert-disallowed': this.state.insertDisallowed
    })

    const insertController = new InsertionController(this.props)

    return connectDropTarget(
      <div className={ className } onKeyUp={ this._onKeyUp }>
        { this.state.dropMessage }
        <Switch app={ app } containingBlock={ containingBlock } preceedingBlock={ preceedingBlock } insertAllowed={ !insertController.full() } />
      </div>
    )
  }

})

module.exports = DropTarget(["block"], dragAndDropUtils.dropHandlers, dragAndDropUtils.dropCollect)(InsertionPoint)
