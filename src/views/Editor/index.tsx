import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import './index.less';

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return './js/json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './js/css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './js/html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './js/ts.worker.bundle.js';
    }
    return './js/editor.worker.bundle.js';
  }
};

console.log(self);

export default function Editor() {
  const divEl = useRef<HTMLDivElement>(null);

  let editor: monaco.editor.IStandaloneCodeEditor;
  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: 'console.log(xx)',
        theme: 'vs-dark',
        language: 'typescript'
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);
  return (
    <div>
      Editor
      <div id="container" ref={divEl}></div>
    </div>
  );
}
