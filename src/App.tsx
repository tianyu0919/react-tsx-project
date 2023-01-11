/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import JSONView from 'react-json-view';
// import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import DocViewer, { DocViewerRenderers, PDFRenderer, PNGRenderer } from 'react-doc-viewer';
import './App.less';

export default function App() {
  const [num, setNum] = useState<number>(0);
  const [flatArr, setFlatArr] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [xx, setXX] = useState('x');

  const arr = [
    {
      name: '树1',
      id: 1,
      children: [
        {
          name: '树1-1',
          id: 11,
          children: []
        }
      ]
    },
    {
      name: '树2',
      id: 2,
      children: [
        {
          name: '树2-1',
          id: 21,
          children: [{ name: '树2-1-1', id: 211, children: [] }]
        },
        { name: '树2-2', id: 22, children: [] }
      ]
    }
  ];

  function deep(item: any, tempArr: any[], parentId?: number) {
    const { name, id, children } = item;
    tempArr.push(parentId ? { name, id, parentId } : { name, id });
    if (parentId) {
      item.parentId = parentId;
    }
    if (children) {
      children.forEach((childrenItem: any) => {
        deep(childrenItem, tempArr, id);
      });
    }
  }

  const documents = [
    { uri: require('./components/Docview/1411180229-赵桂双-体育教育(1).doc') },
    { uri: require('./components/Docview/欢迎使用WPS云文档.docx') },
    { uri: require('./components/Docview/欢迎使用WPS云文档.pdf') }
  ];

  useEffect(() => {
    const tempArr: any[] = [];
    arr.forEach((item) => {
      deep(item, tempArr);
    });
    setTimeout(() => {
      setFlatArr(tempArr);
    }, 1000);
  }, []);

  return (
    <>
      <div className={classnames({ container: true })}>
        <div>
          Hello Word<span>欢迎</span>
        </div>
        <div className={classnames({ JSONContainer: true })}>
          <h2>原始数据</h2>
          <JSONView src={arr}></JSONView>
        </div>
        <div className={classnames({ JSONContainer: true })}>
          <h2>拉平数据</h2>
          <JSONView src={flatArr}></JSONView>
        </div>
        <div>{num}</div>
        <div>
          <button
            onClick={() => {
              setNum(num - 1);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              setNum(num + 1);
            }}
          >
            +
          </button>
        </div>

        <div>
          <DocViewer documents={documents} pluginRenderers={[PDFRenderer, PNGRenderer]} />
        </div>
      </div>
    </>
  );
}
