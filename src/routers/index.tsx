/*
 * @Author: tianyu
 * @Date: 2023-02-10 10:29:11
 * @Description: 路由配置
 */
import React, { Suspense, lazy, ComponentType, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesTypes } from './types';
import nprogress from 'nProgress';
import Loadable from 'react-loadable';

const routers: RoutesTypes[] = [
  {
    path: '/',
    component: <RouterMiddleware path={'App'} />,
    children: [
      { path: '/Home', index: true, component: <RouterMiddleware path={'views/Home'} /> },
      { path: '/About', component: <RouterMiddleware path={'views/About'} /> }
    ]
  },
  {
    path: '*',
    component: <RouterMiddleware component={<div>404 notFound</div>} />
  }
];

// * 加载组件时的 loading
function LazyComponent(): any {
  nprogress.start();
  return <div>loading...</div>;
}

// * router 中间件 用来显示 nProgress
function RouterMiddleware({ path, component }: any): React.ReactElement {
  let Component = null;
  if (path) {
    console.log(lazy(() => import(`src/${path}`)));
    Component = lazy(() => {
      return new Promise((resolve) => {
        import(`src/${path}`).then((res) => {
          setTimeout(() => {
            nprogress.done();
            resolve(res);
          }, 3000);
        });
      });
    });
  } else if (component) {
    Component = function JSXElement() {
      return <>{component}</>;
    } as any;
  }

  return (
    <>
      <Suspense fallback={<LazyComponent />}>
        <Component />
      </Suspense>
    </>
  );
}

function RouteWithSubRoutes(route: RoutesTypes): any {
  const { path, component, index = false, children } = route;
  const RouteComponent: any = <Route index={index} path={path} element={component} />;

  if (children) {
    RouteComponent.children = RouteWithSubRoutes(route);
  }

  return RouteComponent;
}

export function Routers(): React.ReactElement {
  return (
    <>
      <Routes>
        <Route path="/" element={<RouterMiddleware path={'App'} />}>
          <Route index element={<div>Hello World</div>} />
          <Route path="/home" element={<RouterMiddleware path={'views/Home'} />}>
            <Route path="/home/me" element={<div>Home Me</div>} />
          </Route>
          <Route path="/about" element={<RouterMiddleware path={'views/About'} />} />
          <Route path="*" element={<RouterMiddleware component={<div>404 notFound</div>} />} />
        </Route>
      </Routes>
    </>
  );
}
