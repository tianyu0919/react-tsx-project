import React from 'react';
import { Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>Home</div>
      <Button
        onClick={() => {
          navigate('me');
        }}
      >
        To Me
      </Button>
      <Outlet />
    </>
  );
}
