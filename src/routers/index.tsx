/*
 * @Author: tianyu
 * @Date: 2023-02-10 10:29:11
 * @Description:
 */
/*
 * @Author: tianyu
 * @Date: 2023-02-10 10:29:11
 * @Description: 路由配置
 */
import React, { Suspense, lazy } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { RoutesTypes, RouterMiddlewareTypes } from './types';
import nProgress from 'nProgress';

export const routers: RoutesTypes[] = [
  {
    path: '/',
    element: <RouterMiddleware path={'App'} />,
    children: [
      {
        index: true,
        element: <RouterMiddleware component={<div>WellCome To This</div>} />
      },
      {
        path: '/home',
        name: 'Home',
        element: <RouterMiddleware path={'views/Home'} />,
        children: [
          {
            path: '/home/me',
            name: 'Me',
            element: (
              <RouterMiddleware
                component={
                  <>
                    <div>Hello Me</div>
                    <Outlet />
                  </>
                }
              />
            ),
            children: [
              {
                index: true,
                element: <div>你好</div>
              },
              { path: '*', element: <div>not not</div> }
            ]
          }
        ]
      },
      { path: '/about', name: 'About', element: <RouterMiddleware path={'views/About'} /> }
    ]
  },
  {
    path: '*',
    element: <RouterMiddleware component={<div>404 notFound</div>} />
  }
];

export const routersMap: { [protoName: string]: string } = {};

// * 加载组件时的 loading
function LazyComponent(): React.ReactElement {
  nProgress.start();
  return <div>loading...</div>;
}

// * router 中间件 用来显示 nProgress
function RouterMiddleware(props: RouterMiddlewareTypes): React.ReactElement {
  const { path, component } = props;
  let Component = null;
  if (path) {
    Component = lazy(() => {
      return new Promise((resolve) => {
        import(`src/${path}`).then((res) => {
          nProgress.done();
          resolve(res);
        });
      });
    });
  } else if (component) {
    Component = lazy(() => {
      return new Promise((resolve) => {
        const Ele: never = function JSXElement() {
          return <>{component}</>;
        } as never;
        setTimeout(() => {
          nProgress.done();
          resolve({ default: Ele });
        }, 100);
      });
    }) as any;
  }
  // console.log(Component);

  return (
    <>
      <Suspense fallback={<LazyComponent />}>
        <Component />
      </Suspense>
    </>
  );
}

// * 渲染 路由 结构
function RouteWithSubRoutes(route: RoutesTypes, key?: string | number | undefined): any {
  const { path, element, children, name } = route;
  if (path && name && !routersMap[path]) {
    routersMap[path] = name;
  }

  if (!children) {
    return <Route key={`${key}`} index path={path} element={element} />;
  } else {
    return (
      <Route key={`${key}`} path={path} element={element}>
        {children ? children.map((child, idx) => RouteWithSubRoutes(child, `${key}_${idx}`)) : undefined}
      </Route>
    );
  }
}

export function Routers(): React.ReactElement {
  const RouteComponents = routers.map((item: any, idx: any) => {
    return RouteWithSubRoutes(item, idx);
  });

  console.log('xxx');
  // eslint-disable-next-line no-debugger
  console.log(RouteComponents);

  return (
    <>
      <Routes>{RouteComponents}</Routes>
    </>
  );
}
