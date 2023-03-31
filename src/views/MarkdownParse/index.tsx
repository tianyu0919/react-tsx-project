/*
 * @Author: tianyu
 * @Date: 2023-03-30 17:08:31
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import './index.less';
import { Input, Button } from 'antd';
import markdown from 'markdown-it';
import { parseToJson } from './utils/markdownToJson';
import ReactJsonView from 'react-json-view';

export default function MarkdownParse(): any {
  const [textareaValue, setTextareaValue] = useState('');

  function parse(): void {
    const md = new markdown('commonmark', {
      html: true
    });
    const ast = md.parse(textareaValue, {});
    const formatJson = parseToJson(ast);
    console.log(formatJson);
  }

  return (
    <>
      <div className="markdownParseContainer">
        <h2>MarkdownParse</h2>
        <div className="markdownParse-content">
          <div className="markdownParse-textarea">
            <Input.TextArea placeholder="请输入内容" value={textareaValue} onChange={e => setTextareaValue(e.target.value)} />
          </div>
          <Button onClick={parse}>解析</Button>
          <div className="markdownParse-json">
            <ReactJsonView src={[{ name: 'x' }]} displayDataTypes={false} />
          </div>
        </div>
      </div>
    </>
  );
}
