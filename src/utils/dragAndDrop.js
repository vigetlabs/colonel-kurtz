let Actions             = require('../actions/blocks')
let InsertionController = require('../utils/insertionController')

module.exports = {
  dropHandlers:  {
    canDrop: function(props, monitor) {
      const block = monitor.getItem().block
      const insertController = new InsertionController(props)
      const [result, message] = insertController.insertAllowed(block)

      return result
    },

    drop: function (props, monitor, component) {
      if (monitor.didDrop() || !monitor.canDrop()) return;

      const item = monitor.getItem()
      const app = item.app
      const block = item.block
      const { containingBlock, preceedingBlock } = props

      app.push(Actions.insertAt, block, containingBlock, preceedingBlock)

      return { moved: true }
    }
  },

  dropCollect: function(connect, monitor) {
    let item = monitor.getItem() || {}

    return {
      block: item.block,
      canDrop: monitor.canDrop(),
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      itemType: monitor.getItemType()
    }
  },

  dragHandlers: {
    beginDrag: function(props) {
      return {
        block: props.block,
        app: props.app
      }
    }
  },

  dragCollect: function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
}
