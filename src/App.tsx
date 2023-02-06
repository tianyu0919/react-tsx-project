/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import DocView from './TestDemo/DocView';
import Tree from './TestDemo/Tree';
import { Button } from "@douyinfe/semi-ui"
import "@douyinfe/semi-ui/dist/css/semi.min.css"

import './App.less';

function a(): boolean {
  console.log('x');
  return false;
}

export default function App() {
  const [num, setNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function add() {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(() => {
        setLoading(false);
        console.log('xx');
        resolve('xxxx');
      }, 3000);
    })
  } 

  return (
    <>
      <div className={classnames({ container: true })}>
        <Button theme='solid' onClick={add} loading={loading}>点击</Button>
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
