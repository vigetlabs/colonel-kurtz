import React      from 'react/addons'
import {Upstream} from 'microcosm'

let TestUtils = React.addons.TestUtils

export default function (Component, app, props, children) {
  let Context = React.createClass({
    mixins: [ Upstream ],

    render() {
      return <Component ref="subject" { ...props }>{ children }</Component>
    }
  })

  let component = TestUtils.renderIntoDocument(<Context app={ app } />)

  return component.refs.subject
}
