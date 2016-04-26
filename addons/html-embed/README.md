# HTML Embed Addon

1. [Overview](#overview)
2. [Integration](#integration)
3. [Data Format](#data-format)

## Overview

This component may be used to include HTML and accompanying scripts within Colonel Kurtz.

## Integration

When creating a Colonel Kurtz instance, pass the following entry into
the `blockTypes` field:

    let editor = new ColonelKurtz({
      ...
      blockTypes : [
        {
          id        : 'html-embed',
          label     : 'HTML Embed',
          component : require('colonel-kurtz/addons/html-embed')
        }
      ]
    })

## Data Format

    {
      "html"   : string,
      "script" : string
    }

## Considerations

`<script>` and `<style>` tags will be automatically stripped out of HTML input.  The server should do the same as the JSON coming out of the HTML Embed block could be modified.
