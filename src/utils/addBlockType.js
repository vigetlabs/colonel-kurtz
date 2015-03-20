/**
 * This utility adds a new block type to ColonelKurtz. If not given a
 * valid React element, it produces one using ./createBlock
 */

import React from 'react'

export default function (config=[]) {
  return config.map(options => {
    let component = options.component

    if (typeof component === 'object') {
      component = React.createClass(component)
    }

    return { ...options, component }
  })
}
