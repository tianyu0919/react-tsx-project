import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import './index.less';
import { layer, openImgMask } from 'src/utils/layer';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    openImgMask('.imgMask');
  }, []);
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

      <div className="imgMaskContainer">
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">1</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">2</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">3</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">4</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">5</div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">6</div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
