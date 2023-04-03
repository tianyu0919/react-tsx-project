import React, { useEffect, useState } from 'react';
import './index.less';
import { Input, Button } from 'antd';
import markdown from 'markdown-it';
import { parseToJson, formatType } from './utils/markdownToJson';
import ReactJsonView from 'react-json-view';
import mdtemplate from './data.md';

import { unified } from 'unified';
import remarkParse from 'remark-parse';

export default function MarkdownParse(): any {
  const [textareaValue, setTextareaValue] = useState(mdtemplate);
  const [parseMarkdown, setParseMarkdown] = useState<formatType[]>([]);

  async function parse(): Promise<void> {
    const md = new markdown('default', {
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
    // console.log(formatJson);
    setParseMarkdown(formatJson);

    // const asts = unified().use(remarkParse).parse(textareaValue);
    // console.log(asts);
    // setParseMarkdown(asts as any);
  }

  useEffect(() => {
    parse();
  }, []);

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
            <ReactJsonView src={parseMarkdown} displayDataTypes={false} />
          </div>
        </div>
      </div>
    </>
  );
}
