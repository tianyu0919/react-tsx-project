/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Button, Space } from 'antd';
import './App.less';
// import VueDemo from './TestDemo/VueDemo';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routersMap } from './routers';
import { pathToRegexp } from 'path-to-regexp';
import { Breadcrumbs, Button as AButton } from 'components/design';
import mime from 'mime';
import { useSyncState } from './hooks';

const ButtonList = [
  { path: '/home', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/chatgpt', text: 'ChatGPT' },
  { path: '/markdownParse', text: 'MarkdownParse' },
  { path: '/markdownParsecustom', text: 'MarkdownParsecustom' },
  { path: '/hooks', text: 'Hooks' },
  { path: '/FunctionCompose', text: 'FunctionCompose' },
  { path: '/editor', text: 'editor' },
  { path: '/flowLayout', text: 'flowLayout' }
];

export default function App(): React.ReactElement {
  console.log('我是App，渲染了');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [syncNum, setSyncNum] = useSyncState(1);
  const [num, setNum] = useState(1);
  const [breadcrumbItems, setBreadcrumbItems] = useSyncState<any[]>([]);

  const add = async () => {
    // const add = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(() => {
        setLoading(false);
        resolve('xxxx');
      }, 3000);
    });
  };

  useEffect(() => {
    console.log(mime.getType('mp3'));
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets
      .map((_, idx) => {
        const url = `/${pathSnippets.slice(0, idx + 1).join('/')}`;
        const [route] = Object.keys(routersMap).filter(pname => {
          const pathReg = pathToRegexp(pname);
          if (pathReg.test(url)) {
            return routersMap[pname];
          }
        });
        if (!route) {
          return false;
        }
        return (
          <Breadcrumbs.Item
            key={url}
            onClick={(): void => {
              if (location.pathname === url) return;
              navigate(url);
            }}
          >
            {routersMap[route]}
          </Breadcrumbs.Item>
        );
      })
      .filter(item => item) as JSX.Element[];

    const breadcrumbItems = [
      <Breadcrumbs.Item
        key={'/'}
        onClick={(): void => {
          if (location.pathname === '/') return;
          navigate('/');
        }}
      >
        MI
      </Breadcrumbs.Item>
    ]
      .concat(extraBreadcrumbItems)
      .filter(item => item);

    setBreadcrumbItems(breadcrumbItems);
  }, [location.pathname]);

  return (
    <>
      <div className={classnames({ container: true })}>
        <div className={classnames({ breadCrumbs: true })}>
          <Breadcrumbs>{breadcrumbItems()}</Breadcrumbs>
        </div>
        <h2 className={classnames('app-color')}>我是 React 的app-color</h2>
        <Space>
          <AButton>你好</AButton>
          <Button onClick={add} loading={loading}>
            点击
          </Button>
          <Button
            onClick={(): void => {
              setSyncNum(oldState => oldState + 1);
              console.log(syncNum());
            }}
          >
            同步State---{syncNum()}
          </Button>
          <Button
            onClick={(): void => {
              setNum(oldState => oldState + 1);
              console.log(num);
            }}
          >
            异步state---{num}
          </Button>
          {ButtonList.map(BtnItem => (
            <Button
              key={BtnItem.text}
              onClick={(): void => {
                navigate(BtnItem.path);
              }}
            >
              {BtnItem.text}
            </Button>
          ))}
        </Space>
        {/* <VueDemo /> */}
      </div>
      <div className="content-outBox">
        <Outlet />
      </div>
    </>
  );
}
