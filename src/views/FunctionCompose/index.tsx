import React, { useState } from 'react';
import { Input, Space, Button, message } from 'antd';
import classnames from 'classnames';
import './index.less';

// * 给定一个字符串，先翻转，然后转大写，找是否有 `TAOWENG`，如果有那么就输出 `yes` ，否则输出 `no`。

// * 翻转字符串
function stringReverse(str: string): string {
  return str.split('').reverse().join('');
}

// * 转大写
function stringUpper(str: string): string {
  return str.toUpperCase();
}

// * 找是否含有 TAOWENG
function findString(targetStr: string): (str: string) => boolean {
  return (str: string) => str.includes(targetStr);
}

// * 是否有 `TAOWENG`
function isTaoWen(hasTarget: boolean): string {
  return hasTarget ? 'yes' : 'no';
}

function compose(...callers: ((str: any) => any)[]): (str: string) => any {
  return (str: string) => {
    let result = str;
    callers.reduceRight((pre, curr) => {
      result = curr(result);
      console.log(result);
      return curr;
    }, callers.at(-1));
    return result;
  };
}

export default function FunctionCompose() {
  const [input, setInput] = useState('hi, My name is TAOWEN');
  const [result, setResult] = useState('');
  const [messageAPI, contextHolder] = message.useMessage();

  async function search() {
    const findTaoWen = findString('TAO');
    const fn = compose(isTaoWen, findTaoWen, stringUpper, stringReverse);
    const result = fn(input);
    setResult(result);

    // * 通知消息
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }

    console.log(Notification.permission);
    if (Notification.permission === 'granted') {
      // * 发送消息
      const notification = new Notification(input, {
        body: result
      });
      console.log(notification);
      notification.addEventListener('click', e => {
        messageAPI.info(`${input}结果是${result}`);
      });
    }
  }

  return (
    <div className="FunctionComposeContainer">
      {contextHolder}
      <h2>函数式编程</h2>
      <div className="searchContainer">
        <Space>
          <Input
            placeholder="请输入一段字符串"
            value={input}
            onChange={e => {
              setInput(e.target.value);
            }}
          />
          <Button onClick={search}>操作</Button>
        </Space>
      </div>
      <div className="showContent">{result}</div>
    </div>
  );
}
