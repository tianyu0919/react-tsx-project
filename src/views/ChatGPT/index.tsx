/*
 * @Author: 卢天宇
 * @Date: 2023-03-09 21:49:26
 * @Description:
 */
import React, { FC, useEffect, useState } from 'react';
import { Button, Space, Input } from 'antd';
import classnames from 'classnames';
import './index.less';
import axios from 'axios';

let str = '';
let eventSe: EventSource | null = null;

const ChatGPT: FC = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState('');

  function newEventSource() {
    eventSe = new EventSource('http://localhost:2224/api/gpt', {
      withCredentials: false
    });
    console.log(eventSe);

    eventSe.onmessage = ev => {
      const { data } = ev;
      if (data.includes('[DONE]')) {
        return;
      }
      const jsonData = JSON.parse(data);
      str += jsonData.choices[0].text;
      setData(str);
    };

    eventSe.onerror = function (err) {
      eventSe?.close();
    };
  }

  // useEffect(() => {
  //   console.log('xxx');
  //   newEventSource();
  // }, []);

  function search(): void {
    // * 请求，告诉后端，我要链接了。
    axios
      .post('http://localhost:2224/api/tellgpt', {
        text
      })
      .then(res => {
        newEventSource();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className={classnames('chatGptContainer')}>
      <h2 className="title">ChatGPT Demo</h2>
      <div className="content">
        <Input
          type="text"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          onPressEnter={search}
          placeholder="请输入你想问的问题"
        />
        <Button onClick={search}>请求</Button>
      </div>
      <div>{data}</div>
    </div>
  );
};

export default ChatGPT;
