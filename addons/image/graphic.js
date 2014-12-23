var React = require('react')

var Graphic = React.createClass({

  getCaption() {
    var caption = this.props.caption

    return caption ? (
      <figcaption className="col-img-caption">{ caption }</figcaption>
    ) : null
  },

  render() {
    var { src } = this.props

    return src ? (
      <figure className="col-img-figure">
        <img className="col-img-graphic" src={ src } alt="" />
        { this.getCaption() }
      </figure>
    ) : null
  }

})

module.exports = Graphic
