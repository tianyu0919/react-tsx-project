/*
 * @Author: tianyu
 * @Date: 2023-03-30 17:15:42
 * @Description:
 */
// import { BlockType } from '@lark-opdev/block-docs-addon-api';
import { BlockType } from './types/BlockType';
const domMap: { [tagname: string]: string } = {
  h1: 'HEADING1',
  h2: 'HEADING2',
  h3: 'HEADING3',
  h4: 'HEADING4',
  h5: 'HEADING5',
  h6: 'HEADING6',
  ul: 'BULLET',
  ol: 'ORDERED',
  p: 'TEXT',
  code: 'CODE'
};

export default domMap;
