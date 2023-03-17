/*
 * @Author: tianyu
 * @Date: 2023-02-10 11:20:24
 * @Description:
 */
import React, { useEffect } from 'react';
import { CheckRadioBox } from 'src/components/design';
import './index.less';
import rotateBox from 'src/utils/rotateBox';

export default function About() {
  useEffect(() => {
    rotateBox('.transformBox_item', {
      multiple: 15
    });
  }, []);
  return (
    <div className="AboutContainer">
      <h2>About</h2>
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

        <div className="transformBox_outBox">
          <div className="transformBox_item">
            <span className="transformBox_item_text">Hello Box2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
