/*
 * @Author: tianyu
 * @Date: 2023-02-10 11:20:24
 * @Description:
 */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CheckRadioBox } from 'src/components/design';
import { Button } from 'antd';
import './index.less';
import rotateBox from 'src/utils/rotateBox';
// import rotateBox from 'src/utils/rotateBox/bundle.js';

export default function About() {
  const [isChecked, setIsChecked] = useState(false);

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
    </div>
  );
}
