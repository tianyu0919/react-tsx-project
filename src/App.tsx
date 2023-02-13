/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import './App.less';
import VueDemo from './TestDemo/VueDemo';
import { BrowserRouter, Outlet } from 'react-router-dom';

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  async function add() {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        console.log('xx');
        resolve('xxxx');
      }, 3000);
    });
  }

  return (
    <BrowserRouter>
      <div className={classnames({ container: true })}>
        <Button onClick={add} loading={loading}>
          点击
        </Button>
        <VueDemo />
      </div>
      <Outlet />
    </BrowserRouter>
  );
}
