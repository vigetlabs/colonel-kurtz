# Image Addon

1.  [Overview](#overview)
2.  [Integration](#integration)
3.  [Data Format](#data-format)

## Overview

This component may be used to include images from a URL within Colonel Kurtz.

## Integration

When creating a Colonel Kurtz instance, pass the following entry into
the `blockType` field:

    let editor = new ColonelKurtz({
      ...
      blockTypes : [
        {
          id        : 'image',
          label     : 'Image',
          component : require('colonel-kurtz/addons/image')
        }
      ]
    })

## Data Format

    {
      "src": string
    }

**src**: The URL of the image
