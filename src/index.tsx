/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:46:29
 * @Description:
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
// import '@douyinfe/semi-ui/dist/css/semi.min.css';
import 'antd/dist/reset.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Routers } from 'src/routers';
import 'nprogress/nprogress.css';

// import App from './App';
// import Demo from './Demo';

const container = document.querySelector('#root');
const root = createRoot(container!);
// root.render(<Demo />);
root.render(
  <HashRouter>
    <Routers />
  </HashRouter>
);
