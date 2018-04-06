import React from 'react'
import BlockTypes from '../BlockTypes'

describe('Stores - BlockType', function() {
  let fixture = {
    id: 'test',
    label: 'test',
    component: class Test extends React.Component {
      render() {
        return <p />
      }
    }
  }

  it('can handle if no blockTypes are given', function() {
    expect(BlockTypes.deserialize()).toBeInstanceOf(Array)
  })

  it('ensures a deserialized block type has a types field', function() {
    let blockTypes = BlockTypes.deserialize([fixture])
    expect(blockTypes[0]).toHaveProperty('types')
  })
})
