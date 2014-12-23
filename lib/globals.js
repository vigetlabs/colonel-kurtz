declare var __DEV__ : Boolean

declare class Block {
  content: ?Object;
  id: number;
  parentBlockListId: number;
  type: string;
}

declare class BlockList {
  _blocks: Array<number>;
  blockId: number;
  editorId: number;
  id: number;
}

declare class BlockType {
  icon: ?string;
  type: string;
  types: ?Array<string>;
}

declare class SeedBlock {
  content: ?Object;
  blocks: Array<Object>;
  type: string;
}
