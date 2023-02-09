/*
 * @Author: 归宿
 * @Date: 2023-01-09 17:11:12
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import DocView from './TestDemo/DocView';
import Tree from './TestDemo/Tree';
import { ButtonGroup, Button } from '@douyinfe/semi-ui';
import './App.less';
import VueDemo from './TestDemo/VueDemo';

export default function App(): React.ReactElement {
  const [num, setNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function add() {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        console.log('xx');
        resolve('xxxx');
      }, 3000);
    });
  }

  return (
    <>
      <div className={classnames({ container: true })}>
        <Button theme="solid" onClick={add} loading={loading}>
          点击
        </Button>
        {/* <div>{num}</div>
        <div>
          <ButtonGroup>
            <Button
              size="small"
              onClick={() => {
                setNum(num - 1);
              }}
            >
              -
            </Button>
            <Button
              size="small"
              onClick={() => {
                setNum(num + 1);
              }}
            >
              +
            </Button>
          </ButtonGroup> */}
        {/* </div> */}
        <VueDemo />
        {/* <Tree /> */}
        {/* <DocView /> */}
      </div>
    </>
  );
}
