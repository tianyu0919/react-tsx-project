/*
 * @Author: tianyu
 * @Date: 2023-03-30 17:15:42
 * @Description:
 */
// import { BlockType } from '@lark-opdev/block-docs-addon-api';
import type Token from 'markdown-it/lib/token';
import { type formatType } from './types';
import { BlockType } from './types/BlockType';

import domMap from './domMap';

const format: formatType[] = [
  {
    type: BlockType.BULLET,
    content: 'nihao',
    children: [
      {
        type: BlockType.ORDERED,
        content: 'hah',
        children: []
      },
      {
        type: BlockType.ORDERED,
        content: 'xixi',
        children: []
      }
    ]
  },
  {
    type: BlockType.BULLET,
    content: 'lala',
    children: []
  },
  {
    type: BlockType.TEXT,
    content: '你好',
    children: []
  },
  {
    type: BlockType.CODE,
    content: "console.log('hello')",
    language: 'js',
    children: []
  },
  {
    type: BlockType.TEXT,
    content: '你好哇',
    children: []
  }
];

/**
 *
 * @param ast 使用 markdown-it 转换的 ast 语法树
 * @returns
 */
function parseToJson(ast: Token[]): formatType[] {
  console.group('markdown-parse-ast');
  console.log(ast);
  console.groupEnd();
  // *  存放顺序的栈 如果有 nesting为 1 就插入，如果是 -1 就删除
  const stack = [];
  // * 最终得值
  const formatData: formatType[] = [];

  for (let i = 0; i < ast.length; i++) {
    const token = ast[i];
    // console.group('markdown-parse-token');
    // console.log(token);
    const { nesting, tag, type, content, info } = token;

    const htmlType = domMap[tag];

    if (htmlType) {
      // * 如果存在所指定的标签 例如 ul p
      const mdParseObj: formatType = {
        type: htmlType,
        content: '',
        children: []
      };

      // if (htmlType === 'code') {
      //   // * code
      //   mdParseObj.content = content;
      //   mdParseObj.language = info;
      //   break;
      // }

      if (nesting === 1) {
        // * 打开
        stack.push(mdParseObj);
      } else if (nesting === 0) {
        // * 内容
        mdParseObj.content = content;
        if (tag === 'code') {
          mdParseObj.language = info;
        }

        // console.log(content);
      } else if (nesting === -1) {
        // * 关闭
      }
      // console.groupEnd();
    } else {
      if (type === 'inline') {
        stack[stack.length - 1].content = content;
      }
    }
    // formatData.push(mdParseObj);
  }

  function deepFindChildren() {}

  console.log(stack);
  return ast as formatType[];
}

// const TYPE_KEYWORD = {
//   OPEN: 'open',
//   CLOSE: 'close'
// };

// const cache = [];
// const result = [];

// const deepFindLevel = (findObj, insertObj) => {
//   if (findObj.children) {
//     const last = findObj.children[findObj.children.length - 1];
//     if (last.level < insertObj.level) {
//       deepFindLevel(last, insertObj);
//     } else {
//       findObj.children.push({
//         type: insertObj.tag,
//         level: insertObj.level,
//         content: insertObj.content
//       });
//     }
//   } else {
//     findObj.children = [
//       {
//         type: insertObj.tag,
//         level: insertObj.level,
//         content: insertObj.content
//       }
//     ];
//   }
// };

// for (const item of source) {
//   if (item.type.includes(TYPE_KEYWORD.OPEN)) {
//     // type开口
//     cache.push({
//       tag: item.tag,
//       type: item.type,
//       level: item.level
//     });
//   } else if (item.type.includes(TYPE_KEYWORD.CLOSE)) {
//     // type闭口
//     cache.splice(cache.length - 1, 1);
//   } else {
//     // type-other 直接插入
//     if (result.length) {
//       const lastResult = result[result.length - 1];
//       if (lastResult.level < item.level) {
//         deepFindLevel(lastResult, item);
//       } else {
//         result.push({
//           type: cache[cache.length - 1]?.tag || item.tag,
//           level: item.level,
//           content: item.content
//         });
//       }
//     } else {
//       result.push({
//         type: cache[cache.length - 1].tag,
//         level: item.level,
//         content: item.content
//       });
//     }
//   }
// }

// console.log(result);

export { parseToJson, type formatType };
