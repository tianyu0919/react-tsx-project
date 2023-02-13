/*
 * @Author: tianyu
 * @Date: 2023-02-10 10:29:11
 * @Description: 路由配置
 */
import React, { Suspense, lazy, ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { RoutesTypes } from './types';

const routers: RoutesTypes[] = [
  {
    path: '/',
    component: getView(import('src/App')),
    children: [
      { path: '/Home', component: getView(import('src/views/Home')) },
      { path: '/About', component: getView(import('src/views/About')) }
    ]
  }
];

function getView(path: Promise<{ default: ComponentType<any> }>): React.ReactElement {
  const Component = lazy(() => path);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <div>
          <Component />
        </div>
      </Suspense>
    </>
  );
}

export function RouteWithSubRoutes(route: RoutesTypes): React.ReactElement {
  route.component.routes = route.children;
  return (
    <>
      <Route path={route.path} element={route.component} />;
    </>
  );
}
