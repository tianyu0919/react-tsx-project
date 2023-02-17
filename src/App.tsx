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
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routersMap } from './routers';
import { pathToRegexp } from 'path-to-regexp';

export default function App(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function add() {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve('xxxx');
      }, 3000);
    });
  }
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, idx) => {
    const url = `/${pathSnippets.slice(0, idx + 1).join('/')}`;
    const [o] = Object.keys(routersMap).filter((pname) => {
      const pathReg = pathToRegexp(pname);
      if (pathReg.test(url)) {
        return routersMap[pname];
      }
    });

    return (
      <>
        <span>/</span>
        <div
          key={url}
          onClick={() => {
            navigate(url);
          }}
        >
          {routersMap[o]}
        </div>
      </>
    );
  });

  const breadcrumbItems = [
    <div
      key="/"
      onClick={() => {
        navigate('/');
      }}
    >
      Mi
    </div>
  ].concat(extraBreadcrumbItems);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      <div className={classnames({ container: true })}>
        <div className={classnames({ breadCrumbs: true })}>{breadcrumbItems}</div>
        <h2 className={classnames('app-color')}>我是 React 的app-color</h2>

        <Button onClick={add} loading={loading}>
          点击
        </Button>
        <Button
          onClick={() => {
            navigate('/home');
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => {
            navigate('/about');
          }}
        >
          About
        </Button>
        {/* <VueDemo /> */}
      </div>
      <Outlet />
    </>
  );
}
