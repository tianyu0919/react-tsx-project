/*
 * @Author: 归宿
 * @Date: 2023-01-13 16:39:27
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import json from './111.json';
import JSONView from 'react-json-view';
import { JSONType } from './types';
/**
 * @description:
 * 1. 除了 level 为 -1 的显示在树状图
 * 2. index 为 0 表示根节点，可能存在多个 index 为 0 的
 * 3. 只管 type 为 paragraph 的
 */
function formatJson(jsonArr: JSONType[][]) {
  // * 循环分开为几份的
  const treeArr: JSONType[] = [];
  jsonArr.forEach((jsonItem, idx) => {
    // * 单个的
    let treeObjSimple: null | JSONType = null;
    // * 创建字典
    let levelObj: any = {};
    [...new Set(jsonItem.map((item) => item.level))].forEach((item) => {
      levelObj[item] = [];
    });

    for (let i = 0; i < jsonItem.length; i++) {
      const currJson: JSONType = jsonItem[i]; // * 当前的
      const { level } = currJson;
      const prevJson: JSONType = jsonItem[i - 1] || {}; // * 上一个
      const { level: preLevel } = prevJson;
      if (level === 0) {
        treeObjSimple = jsonItem[i];
        treeObjSimple.children = [];
      }
      currJson.children = [];
      levelObj[level].push(currJson);

      // * 判断 有没有上一个的
      if (prevJson && prevJson.level > -1) {
        levelObj[level - 1].at(-1).children.push(currJson);
      }
    }
    if (treeObjSimple) {
      treeArr.push(treeObjSimple);
      console.log(treeObjSimple);
    }
  });
}

// * 裁剪数组，分为很多份
function sliceArrFn(findEle: number, sourceArr: JSONType[]): JSONType[][] {
  let arr: number[] = [];
  // * 找到对应index 为0 的
  sourceArr.forEach((item, idx) => {
    if (item.index === findEle && item.type === 'paragraph') {
      arr.push(idx);
    }
  });

  // * 裁切
  let sliceArr = [];
  for (let i = 0; i < arr.length; i++) {
    let endIdx = arr[i] + 1;

    let tempArr = endIdx ? sourceArr.slice(arr[i], arr[i + 1]) : sourceArr.slice(arr[i]);
    console.log(tempArr);

    let notLevelZero = tempArr.filter((item) => item.level !== -1);
    sliceArr.push(notLevelZero);
  }

  return sliceArr;
}

// * 1. 找到所有的跟节点。

export default function Tree() {
  useEffect(() => {
    const sliceArr = sliceArrFn(0, json);
    console.log(sliceArr);
    formatJson(sliceArr);
  }, []);

  return (
    <div>
      Tree
      <JSONView src={json} />
    </div>
  );
}
