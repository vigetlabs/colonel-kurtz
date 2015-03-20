import React from 'react'

let Graphic = React.createClass({

  render() {
    var { src } = this.props

    return src ? (
      <figure className="col-img-figure">
        <img className="col-img-graphic" src={ src } alt="" />
      </figure>
    ) : null
  }

})

export default Graphic
