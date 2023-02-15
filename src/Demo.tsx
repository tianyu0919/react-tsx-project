import React from 'react';
import { Alert, Breadcrumb } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation, useMatch, useParams, useHref } from 'react-router-dom';
import './demo.less';

const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
    {/* <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/154/detail">154</Link>
    </li> */}
  </ul>
);

const breadcrumbNameMap: Record<string, string> = {
  '/apps': 'Application List',
  '/apps/:ID': 'Application1',
  '/apps/2': 'Application2',
  '/apps/:ID/detail': 'Detail',
  '/apps/2/detail': 'Detail'
  // '/apps/:Id/detail': 'Detail'
};

const Home = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  console.log(pathSnippets);
  const match = useMatch('/apps/:ID/:xx');
  const match1 = useMatch('/apps/:ID/:yy');
  console.log(match, match1);
  const params = useParams();
  console.log(params);
  const href = useHref(location.pathname);
  console.log(href);
  console.log('--------------------------------');

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    // const obj = Object.keys(breadcrumbNameMap).filter((p) => {
    //   const { pattern } = useMatch(p) || {};
    //   if (pattern) {
    //     return pattern.path;
    //   }
    // });
    console.log(url);
    // const match = useMatch();
    // console.log(url);
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
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
        <Route path="*" element={<span>Home Page</span>} />
      </Routes>
      <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <Home />
  </HashRouter>
);

export default App;
