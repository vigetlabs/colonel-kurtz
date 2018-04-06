# YouTube Addon

1.  [Overview](#overview)
2.  [Integration](#integration)
3.  [Data Format](#data-format)

## Overview

This component may be used to include YouTube videos within Colonel Kurtz.

## Integration

When creating a Colonel Kurtz instance, pass the following entry into
the `blockType` field:

    let editor = new ColonelKurtz({
      ...
      blockTypes : [
        {
          id        : 'youtube',
          label     : 'YouTube',
          component : require('colonel-kurtz/addons/youtube')
        }
      ]
    })

## Data Format

    {
      "video_id": string
    }

**video_id**: All YouTube videos have a unique identifier. This value is specified here.
