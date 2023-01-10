/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState } from 'react';
import classnames from 'classnames';
import './App.less';

export default function App() {
  const [num, setNum] = useState<number>(0);
  const [xx, setXX] = useState('x');

  const obj = {
    a: 1,
    b: 2
  };

  console.log(obj);

  return (
    <>
      <div className={classnames({ container: !(num % 2) })}>
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
      </div>
    </>
  );
}
