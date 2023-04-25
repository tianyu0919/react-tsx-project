import React, { useState, useCallback } from 'react';
import { Button, Switch, Space } from 'antd';
import { MemoChild, UnMemoChild } from './children';

export default function UseCallBack() {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [checked]);

  return (
    <>
      <h2>UseCallBack</h2>
      <p>useCallback 一般是跟使用 memo 包裹住的子组件一起使用的</p>
      <Space>
        <Button onClick={() => setCount(count + 1)}>点击{count}</Button>
        <Switch checked={checked} onChange={e => setChecked(e)} />
      </Space>
      <div className="children_box">
        <MemoChild handleClick={handleClick} checked={checked} />
        <UnMemoChild />
      </div>
    </>
  );
}
