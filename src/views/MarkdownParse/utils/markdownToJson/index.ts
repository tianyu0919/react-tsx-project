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
  const stack: formatType[] = [];
  // * 最终得值
  const formatData: formatType[] = [];

  for (let i = 0; i < ast.length; i++) {
    const token = ast[i];
    const { nesting, tag, type, content, info } = token;
    const htmlType = domMap[tag];
    if (htmlType) {
      // * 如果存在所指定的标签 例如 ul p

      if (nesting === -1) {
        // * 关闭

        if (stack.length > 0 && stack[stack.length - 1].type === tag) {
          stack.pop();
        }
        continue;
      }

      const mdParseObj: formatType = {
        type: tag,
        content: ''
      };
      if (nesting === 1) {
        // * 打开
        const stackLastItem = stack[stack.length - 1]; // * 取最后一个元素
        if (!(stack.length > 0 && (stackLastItem.type === 'ul' || stackLastItem.type === 'ol'))) {
          // * 如果最后一个元素不是 ul 或 ol则插入。
          stack.push(mdParseObj);
          formatData.push(mdParseObj);
        } else {
          if (tag !== 'p') {
            if (!stackLastItem.children) {
              stackLastItem.children = [];
            }
            stackLastItem.children.push(mdParseObj);
          }
          console.log(stack);
          console.log(formatData);
        }
      } else if (nesting === 0) {
        // * 内容
        mdParseObj.content = content;
        if (tag === 'code') {
          mdParseObj.language = info;
          formatData.push(mdParseObj);
        }
        // console.log(content);
      }
      // console.groupEnd();
    } else {
      if (type === 'inline') {
        const stackLastItem = stack[stack.length - 1]; // * 取最后一个元素
        const { children } = stackLastItem;
        if (children) {
          children[children.length - 1].content = content;
        } else {
          stackLastItem.content = content;
        }
      }
    }
    // formatData.push(mdParseObj);
  }

  // function setArrFn(token,arr) {}

  console.log(stack);
  console.log(formatData);
  return ast as formatType[];
}

const TYPE_KEYWORD = {
  OPEN: 'open',
  CLOSE: 'close'
};

interface CacheTypes {
  type: string;
  level: number;
  tag: string;
  content?: string;
}

interface ResultTypes {
  type: string;
  level: number;
  content: string;
  children?: ResultTypes[];
}

function findLast<T>(this: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined {
  for (let i = this.length - 1; i >= 0; i--) {
    const value = this[i];
    if (predicate(value, i, this)) {
      return value;
    }
  }
  return undefined;
}

const Cache: CacheTypes[] = [];
const Result: ResultTypes[] = [];

const deepFindLevel = (parentObj: ResultTypes, currentObj: CacheTypes | undefined, contentObj: Token): void => {
  if (parentObj.children) {
    const last = parentObj.children[parentObj.children.length - 1];
    if (last.level < (currentObj?.level ?? -1)) {
      deepFindLevel(last, currentObj, contentObj);
    } else {
      // const findData =
      //   Cache.length > 1 ? findLast.call<CacheTypes[], [(item: CacheTypes) => boolean], CacheTypes | undefined>(Cache, item => item.tag !== 'li' && item.tag !== 'p') : Cache[Cache.length - 1];
      parentObj.children.push({
        type: currentObj?.tag || '',
        level: contentObj.level,
        content: contentObj.content
      });
    }
  } else {
    parentObj.children = [
      {
        type: currentObj?.tag || '',
        level: contentObj.level,
        content: contentObj.content
      }
    ];
  }
};

function findLastResultAsNum(instanceResult: ResultTypes, num: number): ResultTypes {
  if (num <= 0) {
    return instanceResult;
  }
  const children = instanceResult.children;
  const result = children ? children[children.length - 1] : instanceResult;

  return findLastResultAsNum(result, num - 1);
}

function parseToJson2(source: Token[]): formatType[] {
  for (const item of source) {
    if (item.type.includes(TYPE_KEYWORD.OPEN)) {
      // type开口
      Cache.push({
        tag: item.tag,
        type: item.type,
        level: item.level
      });
    } else if (item.type.includes(TYPE_KEYWORD.CLOSE)) {
      // type闭口
      // Cache.splice(Cache.length - 1, 1);
      Cache.pop();
    } else {
      const lastCache =
        Cache.length > 1 ? findLast.call<CacheTypes[], [(item: CacheTypes) => boolean], CacheTypes | undefined>(Cache, item => item.tag !== 'li' && item.tag !== 'p') : Cache[Cache.length - 1];
      // type-other 直接插入
      if (Result.length) {
        const lastCacheNum = Cache.filter(item => item.tag === lastCache?.tag).length;
        const lastResult = findLastResultAsNum(Result[Result.length - 1], lastCacheNum - 1);
        // const lastResult = Result[Result.length - 1];
        if (lastResult.level !== 0 && lastResult.level < item.level) {
          deepFindLevel(lastResult, lastCache, item);
        } else {
          Result.push({
            type: lastCache?.tag || item.tag,
            level: item.level,
            // level: lastCache && lastCache.level >= 0 ? lastCache.level : item.level,
            content: item.content
          });
        }
      } else {
        // * 第一次进入内容，只能进入一次。
        Result.push({
          type: lastCache?.tag || 'root',
          level: item.level,
          // level: lastCache && lastCache.level >= 0 ? lastCache.level : item.level,
          content: item.content
        });
      }
    }
  }
  return Result;
}

// console.log(Result);

export { parseToJson2 as parseToJson, type formatType };
