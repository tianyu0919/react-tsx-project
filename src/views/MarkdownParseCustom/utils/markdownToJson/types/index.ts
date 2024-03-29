// import { BlockType } from '@lark-opdev/block-docs-addon-api';
import { BlockType } from './BlockType';

export interface formatType {
  type: string;
  content: string;
  language?: string;
  children?: formatType[];
}
