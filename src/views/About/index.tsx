/*
 * @Author: tianyu
 * @Date: 2023-02-10 11:20:24
 * @Description:
 */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { CheckRadioBox } from 'src/components/design';
import { Button } from 'antd';
import './index.less';
import rotateBox from 'src/utils/rotateBox';
// import rotateBox from 'src/utils/rotateBox/bundle.js';

const About: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);

  const [arr, setArr] = useState([
    { name: '林俊杰', id: 1 },
    { name: '张杰', id: 2 },
    { name: '周杰伦', id: 3 }
  ]);

  const BoxMemo = useMemo(() => {
    console.log('子组件更改了');
    return arr.map((item, index) => (
      <div key={index} className="">
        <span className="">{item.name}</span>
      </div>
    ));
  }, [arr]);

  useEffect(() => {
    rotateBox('.transformBox_item', {
      multiple: 8,
      resizeDelay: 0
    });
  }, []);

  return (
    <div className="AboutContainer">
      <div style={{ marginBottom: 10 }}>
        <h2>About</h2>
        <Button onClick={(): void => setCount(count + 1)}>setCount{count}</Button>
      </div>
      <div className="checkBoxContainer">
        <CheckRadioBox
          type="radio"
          onChange={(val): void => {
            console.log(val);
          }}
        >
          单选框
        </CheckRadioBox>
        <CheckRadioBox
          type="checkbox"
          onChange={(val): void => {
            console.log(val);
            setIsChecked(val);
          }}
        >
          单选框
        </CheckRadioBox>
      </div>
      <div className="transformBox">
        <div className="transformBox_outBox">
          <div className="transformBox_item">
            <span className="transformBox_item_text">Hello Box1</span>
          </div>
        </div>

        <div
          className="transformBox_outBox"
          style={{
            width: isChecked ? '300px' : ''
          }}
        >
          <div className="transformBox_item">
            <span className="transformBox_item_text">Hello Box2</span>
          </div>
        </div>
      </div>
      <div>{BoxMemo}</div>
    </div>
  );
};

export default About;
