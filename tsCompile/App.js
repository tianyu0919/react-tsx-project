import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import classnames from 'classnames';
import './App.less';
export default function App() {
    const [num, setNum] = useState(0);
    const [xx, setXX] = useState('x');
    const obj = {
        a: 1,
        b: 2
    };
    console.log(obj);
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ className: classnames({ container: !(num % 2) }) }, { children: [_jsx("div", { children: "Hello Word" }), _jsx("div", { children: num }), _jsxs("div", { children: [_jsx("button", Object.assign({ onClick: () => {
                                setNum(num - 1);
                            } }, { children: "-" })), _jsx("button", Object.assign({ onClick: () => {
                                setNum(num + 1);
                            } }, { children: "+" }))] })] })) }));
}
