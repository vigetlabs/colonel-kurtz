# Blocks

A block is the atomic organizational unit for Colonel Kurtz. It has
several properties:

Property   | Description
---------- | -----------
content    | An object containing properties of the block, this could include src for an image, html from a rich text editor, etc.
type       | How to display a block, must be of a preconfigured Block Type. Within Colonel, it controls the editing experience for a block.
blocks     | Children of the block, useful for nesting content inside of other content.
clientOnly | Boolean. True if the block was created during the current editing session.
