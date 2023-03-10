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
import { ResultArrProps } from './types';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, okaidia, oneDark, oneLight, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import RemarkGfm from 'remark-gfm'; // * 将链接转换为可以点击的
import RemarkHTML from 'remark-html';
import rehypeRaw from 'rehype-raw';
import RemarkEmoji from 'remark-emoji';

let eventSe: EventSource | null = null;

const ChatGPT: FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState<ResultArrProps[]>([]);
  const [eventSourcing, setEventSourcing] = useState(false);

  function newEventSource(): void {
    eventSe = new EventSource('http://localhost:2224/api/gpt', {
      withCredentials: false
    });
    // console.log(eventSe);
    let str = '';
    setEventSourcing(true);

    const currentResultObj = {
      question: input,
      answer: ''
    };

    setInput('');
    setResult([...result, currentResultObj]);

    eventSe.onmessage = ev => {
      const { data } = ev;
      document.documentElement.scrollTo({ top: document.body.scrollHeight });
      if (data.includes('[DONE]')) {
        currentResultObj.answer = str;
        setEventSourcing(false);
        setData('');
        return;
      }
      const jsonData = JSON.parse(data);
      const { text } = jsonData.choices[0];
      str += text;
      // str += text.replaceAll('  ', '\n');
      // console.log(jsonData.choices[0].text);
      setData(str);
    };

    eventSe.onerror = function (err): void {
      eventSe?.close();
    };
  }

  function search(): void {
    // * 请求，告诉后端，我要链接了。
    axios
      .post('http://localhost:2224/api/tellgpt', {
        text: input
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
          value={input}
          onChange={(e): void => {
            setInput(e.target.value);
          }}
          onPressEnter={search}
          placeholder="请输入你想问的问题"
        />
        <Button onClick={search}>请求</Button>
      </div>
      <div className={classnames('resultBox')}>
        {result.map((item, idx) => (
          <div className={classnames('result-item')} key={idx}>
            <div className={classnames('result-item-q')}>
              <div className={classnames('result-item-text')}>Q: </div>
              <div className={classnames('result-item-text')}>{item.question}</div>
            </div>
            <div className={classnames('result-item-a')}>
              <div className={classnames('result-item-text')}>A: </div>
              <div className={classnames('result-item-text', 'result-item-text-right')}>
                <div className={classnames('result-item-text-content')}>
                  <ReactMarkdown
                    remarkPlugins={[
                      // RemarkHTML,
                      RemarkGfm,
                      [
                        RemarkEmoji,
                        {
                          emoticon: true
                        }
                      ]
                    ]}
                    skipHtml={true}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        console.log(className);
                        const match = /language-(\w+)/.exec(className || '');
                        // return !inline && match ? (
                        return match ? (
                          <SyntaxHighlighter
                            showLineNumbers={true}
                            lineNumberStyle={{ color: '#ccc', fontSize: 10 }} // 左侧行数的样式
                            style={oneDark as any}
                            language={'tsx'}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {idx === result.length - 1 && eventSourcing ? data : item.answer}
                  </ReactMarkdown>
                  <span
                    className={classnames('typeWriter', {
                      show: idx === result.length - 1 && eventSourcing
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* {data} */}
      </div>
    </div>
  );
};

export default ChatGPT;
