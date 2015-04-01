import React        from 'react'
import menuIcon     from 'icons/menu'

export default React.createClass({

  render() {
    return (<span className="col-toolbar-handle"
                  dangerouslySetInnerHTML={{ __html: menuIcon }} />)
  }

})
