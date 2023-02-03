/*
 * @Author: 归宿
 * @Date: 2023-01-13 16:40:17
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import JSONView from 'react-json-view';

export default function DeepArry() {
  const [flatArr, setFlatArr] = useState<any[]>([]);
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

  function deep(item: { name?: any; id?: any; children?: any; parentId?: any }, tempArr: any[], parentId?: number) {
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
    <div>
      <div className={classnames({ JSONContainer: true })}>
        <h2>原始数据</h2>
        <JSONView src={arr}></JSONView>
      </div>
      <div className={classnames({ JSONContainer: true })}>
        <h2>拉平数据</h2>
        <JSONView src={flatArr}></JSONView>
      </div>
    </div>
  );
}
