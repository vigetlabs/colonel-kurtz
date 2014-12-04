/**
 * @jsx
 * @flow
 */

var React = require('react')
var Types = React.PropTypes
var Field = require('./field')

var Graphic = React.createClass({

  getCaption() {
    var caption = this.props.caption

    return caption ? (
      <figcaption className="col-img-caption">{ caption }</figcaption>
    ) : null
  },

  render(): any {
    var { src, credit } = this.props

    return (
      <figure className="col-img-figure">
        <img className="col-img-graphic" src={ src } alt="" />
        { this.getCaption() }
      </figure>
    )
  }

})

module.exports = Graphic
