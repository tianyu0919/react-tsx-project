import React from 'react';
import './index.less';
import classnames from 'classnames';
import { Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Hooks() {
  const navigate = useNavigate();
  function handleClickRouter() {}

  return (
    <div className={classnames('Hooks-Container')}>
      <div className="Hooks-title">
        <Button onClick={(): void => navigate('useCallback')}>useCallback</Button>
        <Button onClick={(): void => navigate('useMemo')}>useMemo</Button>
      </div>
      <div className="Hooks-Content">
        <Outlet />
      </div>
    </div>
  );
}
