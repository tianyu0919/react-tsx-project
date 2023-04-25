/*
 * @Author: tianyu
 * @Date: 2023-02-10 10:29:11
 * @Description: 路由配置
 */
import React from 'react';
import { Routes, Outlet } from 'react-router-dom';
import { RoutesTypes } from './types';
import { routersMap, RouterMiddleware, RouteWithSubRoutes } from './utils';

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
      { path: '/about', name: 'About', element: <RouterMiddleware path={'views/About'} /> },
      { path: '/chatgpt', name: 'ChatGPT', element: <RouterMiddleware path={'views/ChatGPT'} /> },
      { path: '/markdownParse', name: 'markdownParse', element: <RouterMiddleware path={'views/MarkdownParse'} /> },
      { path: '/markdownParsecustom', name: 'markdownParsecustom', element: <RouterMiddleware path={'views/MarkdownParseCustom'} /> },
      {
        path: '/hooks',
        name: 'hooks',
        element: <RouterMiddleware path={'views/Hooks'} />,
        children: [
          { index: true, element: <RouterMiddleware path={'views/Hooks/views'} showLoading /> },
          { path: '/hooks/useCallback', name: 'useCallback', element: <RouterMiddleware path={'views/Hooks/views/useCallback'} /> },
          { path: '/hooks/useMemo', name: 'useMemo', element: <RouterMiddleware path={'views/Hooks/views/useMemo'} /> },
          {
            path: '/hooks/*',
            element: <RouterMiddleware component={<div>404 notFound</div>} />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <RouterMiddleware component={<div>404 notFound</div>} />
  }
];

export { routersMap };

export function Routers(): React.ReactElement {
  const RouteComponents = routers.map((item: any, idx: any) => {
    return RouteWithSubRoutes(item, idx);
  });

  return (
    <>
      <Routes>{RouteComponents}</Routes>
    </>
  );
}
