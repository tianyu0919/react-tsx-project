import React, { useEffect, useState } from 'react';
import './index.less';
import { Input, Button } from 'antd';
import markdown from 'markdown-it';
import { parseToJson } from './utils/markdownToJson';
import ReactJsonView from 'react-json-view';
import mdtemplate from './data.md';

export default function MarkdownParse(): any {
  const [textareaValue, setTextareaValue] = useState(mdtemplate);

  async function parse(): Promise<void> {
    const md = new markdown('commonmark', {
      html: true
    });
    const ast = md.parse(textareaValue, {
      html: false,
      linkify: true,
      typographer: true
    });

    const html = md.render(textareaValue);
    console.log(html);
    const formatJson = await parseToJson(ast);
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
