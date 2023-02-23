/*
 * @Author: 卢天宇
 * @Date: 2023-02-23 21:35:28
 * @Description:
 */
import React, { useEffect, memo } from 'react';
import { Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import './index.less';
import { layer, openImgMask } from 'src/utils/layer';

const Home = function Home() {
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
};

export default memo(Home);
