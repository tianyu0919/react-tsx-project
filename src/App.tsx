/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import DocView from './TestDemo/DocView';
import Tree from './TestDemo/Tree';

import './App.less';

function a(): boolean {
  console.log('x');
  return false;
}

export default function App() {
  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div className={classnames({ container: true })}>
        <div>
          Hello Word<span>欢迎</span>
        </div>
        <div>{num}</div>
        <div>
          <button
            onClick={() => {
              setNum(num - 1);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              setNum(num + 1);
            }}
          >
            +
          </button>
        </div>
        <Tree />
        {/* <DocView /> */}
      </div>
    </>
  );
}
