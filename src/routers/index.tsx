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
      {
        path: '/home',
        index: true,
        component: <RouterMiddleware path={'views/Home'} />,
        children: [
          {
            path: '/home/me',
            component: <RouterMiddleware component={<div>Hello Me</div>} />
          },
          { path: '/home/*', component: <RouterMiddleware component={<div>home 404 not found</div>} /> }
        ]
      },
      { path: '/about', component: <RouterMiddleware path={'views/About'} /> }
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

console.log('hahahah');
const com = (
  <Route path="/">
    <Route path="/a"></Route>
  </Route>
);
console.log(com.props);
const R1 = (<Route path="/"></Route>) as any;
console.log(R1);
// R1.children = <Route path='/a'></Route>

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
          }, 1000);
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

function RouteWithSubRoutes(route: RoutesTypes, key?: string): any {
  const { path, component, children } = route;
  if (!children) {
    return <Route key={key} index path={path} element={component} />;
  } else {
    return (
      <Route key={key} path={path} element={component}>
        {children ? children.map((child) => RouteWithSubRoutes(child, child.path)) : undefined}
      </Route>
    );
  }
}

export function Routers(): React.ReactElement {
  const RouteComponents = routers.map((item) => {
    return RouteWithSubRoutes(item, item.path);
  });

  console.log(RouteComponents);

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<RouterMiddleware path={'App'} />}>
          <Route index element={<div>Hello World</div>} />
          <Route path="/home" element={<RouterMiddleware path={'views/Home'} />}>
            <Route path="/home/me" element={<div>Home Me</div>} />
          </Route>
          <Route path="/about" element={<RouterMiddleware path={'views/About'} />} />
          <Route path="*" element={<RouterMiddleware component={<div>404 notFound</div>} />} />
        </Route> */}
        {RouteComponents}
      </Routes>
    </>
  );
}
