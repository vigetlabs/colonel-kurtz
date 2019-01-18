import React from 'react'

const BlockContext = React.createContext({
  structure: [],
  blocks: [],
  set: () => {},
  add: () => {},
  remove: () => {}
})

export const BlockProvider = BlockContext.Provider

export const BlockConsumer = BlockContext.Consumer

export default BlockContext
