/*
 * @Author: tianyu
 * @Date: 2023-02-10 11:20:24
 * @Description:
 */
import React from 'react';
import { CheckRadioBox } from 'src/components/design';

export default function About() {
  return (
    <>
      <div>About</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
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
    </>
  );
}
