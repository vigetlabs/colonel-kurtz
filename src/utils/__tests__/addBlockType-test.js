import Dispatcher      from 'dispatcher'
import CreateBlockType from 'actions/block_type/create'
import addBlockType    from 'utils/addBlockType'

describe('Utils - addBlockType', function() {

  it ('dispatches a CreateBlockType action', function() {
    var spy = sinon.spy(Dispatcher, 'dispatch')

    addBlockType({
      type: 'test',
      component: React.createClass({
        render() {
          return <p>foo</p>
        }
      })
    })

    spy.getCall(0).args[0].should.have.property('type', CreateBlockType)

    spy.restore()
  })

  it ('if given an invalid react element, it attempts to make one', function() {
    var spy = sinon.spy(React, 'createClass')

    addBlockType({ type: 'test', component: { render() { return null } } })

    spy.should.have.been.called
    spy.restore()
  })

  it ('can add multiple block types', function() {
    var spy = sinon.spy(Dispatcher, 'dispatch')

    addBlockType(
      {
        type: 'test-1',
        component: React.createClass({
          render() { return (<p>foo</p>) }
        })
      },
      {
        type: 'test-2',
        component: React.createClass({
          render() { return (<p>foo</p>) }
        })
      }
    )

    spy.should.have.been.calledTwice
    spy.restore()
  })
})
