import Bus from 'bus'

let Test = React.addons.TestUtils

describe('Mixin - Monitor', function() {

  let getComponent = function() {
    return React.createClass({
      mixins: [ require('../monitor') ],
      getState() { return { state: 'new' } },
      render() { return (React.DOM.p()) }
    })
  }

  it ('subscribes to the bus when the component mounts', function() {
    let Component = getComponent()

    sinon.spy(Bus, 'subscribe')

    Test.renderIntoDocument(<Component />)

    Bus.subscribe.should.have.been.called

    Bus.subscribe.restore()
  })

  it ('unsubscribes to the bus when the component mounts', function() {
    let Component = React.createClass({
      render() {
        return React.createElement(getComponent())
      }
    })

    sinon.spy(Bus, 'unsubscribe')

    React.render(<Component />, document.body)
    React.render(<Component />, document.body)

    Bus.unsubscribe.should.have.been.called

    Bus.unsubscribe.restore()
  })

  it ('calls getState to update the state of the component', function() {
    let Component = getComponent()
    let component = Test.renderIntoDocument(<Component />)

    component.setState({ state: 'stale' })
    component.updateState();

    component.state.should.have.property('state', 'new')
  })

  it ('calls updateState when it recieves new properties', function() {
    let Component = getComponent()
    let component = Test.renderIntoDocument(<Component />)

    sinon.spy(component, 'updateState')

    component.setProps({ foo: 'bar' })

    component.updateState.should.have.been.called
  })

})
