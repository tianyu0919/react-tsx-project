import React, { useEffect } from 'react';
import { Button, message } from 'antd';

const MemoChild: React.FC<{ handleClick: () => void; checked: boolean }> = React.memo(function MemoChild({ handleClick, checked }: { handleClick: () => void; checked: boolean }) {
  const [messageAPI, contextHolder] = message.useMessage();
  console.log('MemoChild 重新加载了');

  useEffect(() => {
    messageAPI.info('MemoChild load');
  });

  return (
    <>
      {contextHolder}
      <div>MemoChild {checked ? '选中了' : '没选中'}</div>
      <Button onClick={handleClick}>ss</Button>
    </>
  );
});

const UnMemoChild: React.FC = () => {
  const [messageAPI, contextHolder] = message.useMessage();
  console.log('UnMemoChild 重新加载了');

  useEffect(() => {
    messageAPI.info('UnMemoChild load');
  });

  return (
    <>
      {contextHolder}
      <div>UnMemoChild</div>
    </>
  );
};

export { MemoChild, UnMemoChild };
