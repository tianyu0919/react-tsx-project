/*
 * @Author: tianyu
 * @Date: 2023-03-30 17:15:42
 * @Description:
 */
// import { BlockType } from '@lark-opdev/block-docs-addon-api';
import { BlockType } from './types/BlockType';
const domMap: { [tagname: string]: BlockType } = {
  h1: BlockType.HEADING1,
  h2: BlockType.HEADING2,
  h3: BlockType.HEADING3,
  h4: BlockType.HEADING4,
  h5: BlockType.HEADING5,
  h6: BlockType.HEADING6,
  ul: BlockType.BULLET,
  ol: BlockType.ORDERED,
  p: BlockType.TEXT,
  code: BlockType.CODE
};

export default domMap;
