import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import nProgress from 'nProgress';
import { RoutesTypes, RouterMiddlewareTypes } from './types';

export const routersMap: { [protoName: string]: string } = {};

// * 加载页面 loading 效果
function LazyComponent(): React.ReactElement {
  nProgress.start();
  return <div>loading...</div>;
}

// * router 中间件 用来显示 nProgress
export function RouterMiddleware(props: RouterMiddlewareTypes): React.ReactElement {
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

  return (
    <>
      <Suspense fallback={<LazyComponent />}>
        <Component />
      </Suspense>
    </>
  );
}

// * 渲染 路由 结构
export function RouteWithSubRoutes(route: RoutesTypes, key?: string | number | undefined): React.ReactElement {
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
