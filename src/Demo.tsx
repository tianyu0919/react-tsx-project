/*
 * @Author: tianyu
 * @Date: 2023-02-15 15:01:38
 * @Description:
 */
import React from 'react';
import { Alert, Breadcrumb } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation, useMatch, useParams, useHref, Outlet } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';
import './demo.less';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2/xxi/List">List</Link>
    </li>
    {/* <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/154/detail">154</Link>
    </li> */}
  </ul>
);

const breadcrumbNameMap: Record<string, string> = {
  '/apps': 'Application List',
  '/apps/:Id': 'Application1',
  // '/apps/2': 'Application2',
  '/apps/:Id/:Detail': 'Detail',
  '/apps/:Id/:Detail/list': 'List'
  // '/apps/2/detail': 'Detail'
  // '/apps/:Id/detail': 'Detail'
};

const Home = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const params = useParams();
  console.log(params);
  const href = useHref(pathname);
  const match = useMatch(pathname);
  console.log(href, match);
  console.log(location, pathname);
  console.log('--------------------------------');

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const [o] = Object.keys(breadcrumbNameMap).filter((p) => {
      const pathReg = pathToRegexp(p);
      if (pathReg.test(url)) {
        return breadcrumbNameMap[p];
      }
    });
    console.log(o, url);
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[o]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Home</Link>
        <Link to="/apps">Application List</Link>
      </div>
      <Routes>
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:Id" element={<ChildView />}>
          <Route path="/apps/:Id/:Detail" element={<SonView />} />
        </Route>
        <Route path="*" element={<span>Home Page</span>} />
      </Routes>
      <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

function ChildView() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div>xixi {params.Id}</div>
      <Outlet />
    </>
  );
}

function SonView() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div>{JSON.stringify(params, null, 2)}</div>
    </>
  );
}

const App: React.FC = () => (
  <HashRouter>
    <Home />
  </HashRouter>
);

export default App;
