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
  language?: string;
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

function parseToJson(source: Token[]): formatType[] {
  const Cache: CacheTypes[] = [];
  const Result: ResultTypes[] = [];

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
      Cache.pop();
    } else {
      const lastCache =
        Cache.length > 1 ? findLast.call<CacheTypes[], [(item: CacheTypes) => boolean], CacheTypes | undefined>(Cache, item => item.tag !== 'li' && item.tag !== 'p') : Cache[Cache.length - 1];
      // type-other 直接插入
      if (Result.length) {
        // const lastCacheNum = Cache.filter(item => item.tag === lastCache?.tag).length;
        // * 因为 lastCache 就已经算一个，所以 lastCacheNum 最后 -1。
        const lastCacheNum = Cache.filter(item => item.tag === 'ul' || item.tag === 'ol').length - 1;
        const lastResult = findLastResultAsNum(Result[Result.length - 1], lastCacheNum - 1);
        if (lastResult.level !== 0 && lastResult.level < item.level) {
          deepFindLevel(lastResult, lastCache, item);
        } else {
          pushToResult(Result, lastCache, item);
        }
      } else {
        // * 第一次进入内容，只能进入一次。
        pushToResult(Result, lastCache, item);
      }
    }
  }
  return Result;
}

function pushToResult(Result: ResultTypes[], lastCache: CacheTypes | undefined, item: Token): void {
  const obj: ResultTypes = {
    type: lastCache?.tag || item.tag || 'p',
    level: item.level,
    // level: lastCache && lastCache.level >= 0 ? lastCache.level : item.level,
    content: item.content
  };

  if (item.info) {
    obj.language = item.info;
  }

  Result.push(obj);
}

export { parseToJson, type formatType };
