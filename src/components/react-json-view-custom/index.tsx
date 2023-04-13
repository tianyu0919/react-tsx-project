/*
 * @Author: 卢天宇
 * @Date: 2023-04-13 20:46:54
 * @Description:
 */
import React from 'react';
import './index.less';
import { ReactJsonViewCustomTypes, DeepJsonFnTypes } from './types';

const deepJson: DeepJsonFnTypes = (key, data) => {
  if (data && typeof data === 'object') {
    // if ()
  }
};

const ReactJsonViewCustom: React.FC<ReactJsonViewCustomTypes> = ({ src, displayDataTypes }) => {
  console.log(src);

  const children = [];

  for (const [key, value] of Object.entries(src)) {
    console.log(key, value);
    children.push(deepJson(key, value));
  }

  return <div>ReactJsonViewCustom</div>;
};

export default ReactJsonViewCustom;
