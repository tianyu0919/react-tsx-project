/*
 * @Author: 卢天宇
 * @Date: 2023-03-16 22:41:07
 * @Description:
 */
import React, { useState } from 'react';
import './index.less';

export default function Index() {
  const [num, setNum] = useState(0);

  const add = () => {
    setNum(oldVal => oldVal + 1);
  };
  return (
    <div className={'IndexContainer'}>
      我<button onClick={add}>num</button>
    </div>
  );
}
