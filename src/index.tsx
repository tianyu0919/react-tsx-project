/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:46:29
 * @Description:
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
// import '@douyinfe/semi-ui/dist/css/semi.min.css';
import 'antd/dist/reset.css';

import App from './App';

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
