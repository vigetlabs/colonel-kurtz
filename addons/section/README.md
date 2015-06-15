# Section Addon

1. [Overview](#overview)
2. [Integration](#integration)
3. [Data Format](#data-format)

## Overview

The section addon is just a blank BlockType that is designed to allow children.

## Integration

When creating a Colonel Kurtz instance, pass the following entry into
the `blockType` field:

    let editor = new ColonelKurtz({
      ...
      blockTypes : [
        // ... other block types
        {
          id        : 'section',
          label     : 'Section',
          component : require('colonel-kurtz/addons/section'),
          types     : [ 'text', 'image']
        }
      ]
    })

## Data Format

The section block type has no attributes of its own
