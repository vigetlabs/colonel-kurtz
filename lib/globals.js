declare var __DEV__ : Boolean

declare class Block {
  content: ?Object;
  id: number;
  parent: Block;
  type: string;
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
