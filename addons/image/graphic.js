/**
 * @jsx
 * @flow
 */

var React = require('react')
var Types = React.PropTypes

var Graphic = React.createClass({

  getCaption() {
    var caption = this.props.caption

    return caption ? (
      <figcaption className="col-img-caption">{ caption }</figcaption>
    ) : null
  },

  render(): any {
    var { src, credit } = this.props

    return src ? (
      <figure className="col-img-figure">
        <img className="col-img-graphic" src={ src } alt="" />
        { this.getCaption() }
      </figure>
    ) : null
  }

})

module.exports = Graphic
